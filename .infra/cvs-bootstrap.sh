#!/usr/bin/env bash
# cvs bootstrap (phase 1) — run once:  sudo bash cvs-bootstrap.sh
#
# Disk, users, directories only. No packages, no services — those are phase 2,
# so this stays small enough to actually read before running it as root.
#
# User model:
#   pviral  your admin account            full sudo (password)
#   deploy  CI deploy target + app owner  ZERO sudo, by design
#   aibot   agent operations account      TEMPORARY full sudo (removed later)
#
# "deploy has zero sudo" comes from aj-courier's README and is deliberate:
# neither deploy key can execute commands on this box. One does rrsync-jailed
# file transfer, the other touches a marker file. Everything privileged
# happens in root-owned units that no repo controls.
set -euo pipefail

PVIRAL_KEY='ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMbRcAkxZwIVAo2wuXVc+Tm1sE6QgqUs3qZCI3aM3rBu viral@VIRAL-20260729'
AIBOT_KEY='ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOeLIhzLwy2V9m0apse9PlwrMI9j20/XV6pvCRfpUjbV aibot@cvs'

say() { printf '\n\033[1;36m== %s\033[0m\n' "$*"; }

# ---------------------------------------------------------------- 1. disk
# Ubuntu's installer put the whole 474G into the VG but only carved a 100G LV.
say "Extending root volume"
if lvdisplay /dev/ubuntu-vg/ubuntu-lv >/dev/null 2>&1; then
  lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv || echo "  (already at max extent)"
  resize2fs /dev/ubuntu-vg/ubuntu-lv || true
  df -h / | tail -1
else
  echo "  !! ubuntu-vg/ubuntu-lv not found — skipping; check lsblk manually"
fi

# ---------------------------------------------------------------- 2. users
mkkey() {  # $1=user  $2=key
  install -d -m 700 -o "$1" -g "$1" "/home/$1/.ssh"
  printf '%s\n' "$2" > "/home/$1/.ssh/authorized_keys"
  chown "$1:$1" "/home/$1/.ssh/authorized_keys"
  chmod 600 "/home/$1/.ssh/authorized_keys"
}

say "Creating pviral (admin account)"
id pviral >/dev/null 2>&1 || adduser --disabled-password --gecos "Viral Patel" pviral
usermod -aG sudo,adm pviral
mkkey pviral "$PVIRAL_KEY"

say "Creating deploy (CI deploy target; owns app files)"
id deploy >/dev/null 2>&1 || adduser --disabled-password --gecos "Deploy automation" deploy
# NO sudoers file for deploy — intentional, see header. Its authorized_keys
# entries (added in phase 2) carry forced commands instead.

say "Creating aibot (agent operations account)"
id aibot >/dev/null 2>&1 || adduser --disabled-password --gecos "AI agent" aibot
mkkey aibot "$AIBOT_KEY"

# ------------------------------------------------------------- 3. sudoers
say "Writing sudoers policy"

# aibot: TEMPORARY broad rights, build-out only. Delete this file once the
# stack is running; it gets replaced by a narrow ops policy
# (systemctl / journalctl / nginx -t only).
cat > /etc/sudoers.d/50-aibot-buildout <<'EOF'
aibot ALL=(ALL) NOPASSWD: ALL
EOF
chmod 440 /etc/sudoers.d/50-aibot-buildout

# Remove the deploy policy if an earlier revision of this script created one.
rm -f /etc/sudoers.d/50-deploy

visudo -c

# ---------------------------------------------------------------- 4. dirs
# Web roots follow aj-courier's documented layout: /var/www/<host>/html/
say "Creating web roots and data directories"
for host in ajcourier.uniquelabs.dev uniquelabs.dev codeviewsolutions.com; do
  install -d -m 755 -o deploy -g deploy "/var/www/$host"
  install -d -m 755 -o deploy -g deploy "/var/www/$host/html"
done

# Uploads live outside any checkout so a re-clone can never destroy them.
install -d -m 700 -o deploy -g deploy /var/lib/aj-courier
install -d -m 700 -o deploy -g deploy /var/lib/aj-courier/uploads

# Holds .env.prod (mode 600, never in git).
install -d -m 755 -o deploy -g deploy /home/deploy/apps
install -d -m 750 -o deploy -g deploy /home/deploy/apps/aj-courier-api

say "Phase 1 complete."
cat <<'NEXT'

Next steps, in order:
  1. sudo passwd pviral                     # set your admin password
  2. ssh pviral@codeviewsolutions.local     # verify key auth BEFORE retiring viral
  3. phase 2 (packages + services)

Created:
  users    : pviral (sudo), deploy (no sudo), aibot (temp sudo)
  webroots : /var/www/{ajcourier.uniquelabs.dev,uniquelabs.dev,codeviewsolutions.com}/html
  data     : /var/lib/aj-courier/uploads (0700 deploy)
  env dir  : /home/deploy/apps/aj-courier-api/   (.env.prod goes here, mode 600)
NEXT
