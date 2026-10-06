#!/usr/bin/env bash
# cvs phase 2 — packages + service baseline.  sudo bash cvs-phase2-services.sh
#
# Installs and configures services only. No app deployment, no vhosts, no
# database roles — those come later with the apps.
#
# Everything that listens is bound to localhost or the LAN. Nothing is
# exposed to the internet: public traffic will arrive via cloudflared's
# OUTBOUND tunnel (phase 3), so no inbound ports are ever opened.
set -euo pipefail

say()  { printf '\n\033[1;36m== %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m!! %s\033[0m\n' "$*"; }

LAN_CIDR="192.168.68.0/22"   # Deco LAN — matches eno1's /22

export DEBIAN_FRONTEND=noninteractive

# ------------------------------------------------------------ 1. packages
say "Installing packages"
apt-get update -qq
apt-get install -y -qq \
  nginx \
  postgresql-18 \
  redis-server \
  podman \
  rsync \
  ufw \
  fail2ban \
  curl ca-certificates gnupg lsb-release

# cloudflared is not in Ubuntu's repos — add Cloudflare's.
say "Adding Cloudflare apt repo + cloudflared"
install -d -m 755 /usr/share/keyrings
if [ ! -f /usr/share/keyrings/cloudflare-main.gpg ]; then
  curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg \
    -o /usr/share/keyrings/cloudflare-main.gpg
  chmod 644 /usr/share/keyrings/cloudflare-main.gpg
fi
# Cloudflare publishes against Debian/Ubuntu suites; 'noble' is the current
# stable target and works on 26.04. Revisit if a 'resolute' suite appears.
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared noble main" \
  > /etc/apt/sources.list.d/cloudflared.list
apt-get update -qq
apt-get install -y -qq cloudflared

# ---------------------------------------------------------- 2. postgresql
say "Configuring PostgreSQL (localhost only)"
PGCONF="/etc/postgresql/18/main/postgresql.conf"
if [ -f "$PGCONF" ]; then
  # Default is already localhost; assert it rather than assume.
  sed -i "s/^#\?listen_addresses.*/listen_addresses = 'localhost'/" "$PGCONF"
  systemctl enable --now postgresql
  sudo -u postgres psql -tAc "select version();" | head -1
else
  warn "postgresql.conf not found at $PGCONF — check the installed version"
fi

# --------------------------------------------------------------- 3. redis
say "Configuring Redis (localhost only)"
RCONF="/etc/redis/redis.conf"
if [ -f "$RCONF" ]; then
  sed -i 's/^bind .*/bind 127.0.0.1 -::1/' "$RCONF"
  sed -i 's/^# *protected-mode .*/protected-mode yes/' "$RCONF"
  systemctl enable --now redis-server
  redis-cli ping || warn "redis not responding"
else
  warn "redis.conf not found"
fi
# NOTE: no requirepass set here. aj-courier's .env.prod expects one; it gets
# set with the app, alongside the matching REDIS_URL.

# --------------------------------------------------------------- 4. nginx
say "Configuring nginx baseline"
# Catch-all that drops unmatched Host headers instead of serving something
# unintended. Real vhosts are added with the apps.
cat > /etc/nginx/sites-available/000-catchall <<'EOF'
server {
    listen 127.0.0.1:80 default_server;
    server_name _;
    return 444;
}
EOF
ln -sf /etc/nginx/sites-available/000-catchall /etc/nginx/sites-enabled/000-catchall
rm -f /etc/nginx/sites-enabled/default

# nginx only ever receives traffic from cloudflared on loopback.
nginx -t && systemctl enable --now nginx

# -------------------------------------------------------------- 5. podman
say "Enabling podman socket + lingering for deploy"
systemctl enable --now podman.socket || warn "podman.socket unavailable"
# Lets deploy-owned user units keep running when it isn't logged in.
id deploy >/dev/null 2>&1 && loginctl enable-linger deploy || warn "deploy user missing — run phase 1 first"

# ----------------------------------------------------------- 6. firewall
# Ordering matters: allow SSH BEFORE enabling, or this locks us out.
say "Configuring ufw"
ufw --force reset >/dev/null
ufw default deny incoming
ufw default allow outgoing
ufw allow from "$LAN_CIDR" to any port 22 proto tcp comment 'SSH from LAN'
ufw --force enable
ufw status verbose

# ------------------------------------------------------------ 7. fail2ban
say "Enabling fail2ban (sshd jail)"
cat > /etc/fail2ban/jail.d/sshd.local <<'EOF'
[sshd]
enabled = true
backend = systemd
maxretry = 5
findtime = 10m
bantime  = 1h
EOF
systemctl enable --now fail2ban

# ------------------------------------------------------------- summary
say "Phase 2 complete"
printf '\n%-14s %s\n' "SERVICE" "STATE"
for s in postgresql redis-server nginx fail2ban ufw cloudflared; do
  printf '%-14s %s\n' "$s" "$(systemctl is-active "$s" 2>/dev/null || echo inactive)"
done
echo
echo "Listening sockets (expect only 22 on LAN, 80 on loopback, 5432/6379 local):"
ss -lntp | awk 'NR==1 || /:22|:80|:5432|:6379/'
cat <<'NEXT'

cloudflared is installed but NOT configured — it has no tunnel yet and is
expected to be inactive. That is phase 3, and it needs your Cloudflare
account: a tunnel token, plus the Access application for SSH.
NEXT
