/**
 * The monthly / yearly switch, shared by every candidate world.
 *
 * Behaviour only — each world styles its own control in its own grammar. The
 * price that shows is decided by a data attribute in CSS rather than by this
 * script, so the monthly column still renders correctly with no JavaScript at
 * all; the switch is an enhancement, not a dependency.
 */
export function initBilling() {
  document.querySelectorAll('[data-billing]').forEach((group) => {
    const buttons = [...group.querySelectorAll('[data-cycle-btn]')];
    if (!buttons.length) return;

    const set = (cycle) => {
      group.dataset.cycle = cycle;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cycleBtn === cycle)));
    };

    buttons.forEach((b) => b.addEventListener('click', () => set(b.dataset.cycleBtn)));
    set(group.dataset.cycle || 'monthly');
  });
}
