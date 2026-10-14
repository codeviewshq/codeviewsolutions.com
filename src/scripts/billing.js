// Keep prices and enquiry links in sync; monthly links also work without JavaScript.
export function initBilling() {
  document.querySelectorAll('[data-billing]').forEach((group) => {
    const buttons = [...group.querySelectorAll('[data-cycle-btn]')];
    if (!buttons.length) return;

    const set = (cycle) => {
      group.dataset.cycle = cycle;
      group.querySelectorAll('a[data-plan]').forEach((link) => {
        const url = new URL(link.href);
        url.searchParams.set('cycle', cycle);
        link.href = url.href;
      });
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cycleBtn === cycle)));
    };

    buttons.forEach((b) => b.addEventListener('click', () => set(b.dataset.cycleBtn)));
    set(group.dataset.cycle || 'monthly');
  });
}
