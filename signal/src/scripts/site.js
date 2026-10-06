const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
if (menu && navigation) {
  menu.hidden = false;
  document.documentElement.classList.add('has-menu');
  const close = () => { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { close(); menu.focus(); } });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) close(); });
}

document.querySelectorAll('[data-billing]').forEach(group => {
  const toggle = group.querySelector('.billing-toggle');
  if (toggle) toggle.hidden = false;
  const buttons = [...group.querySelectorAll('[data-cycle-btn]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    group.dataset.cycle = button.dataset.cycleBtn;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
});

const serviceInput = document.querySelector('#service');
if (serviceInput) {
  const query = new URLSearchParams(location.search);
  const value = query.get('service');
  if ([...serviceInput.options].some(option => option.value === value)) serviceInput.value = value;
  const plan = query.get('plan');
  if (['care', 'improve', 'grow'].includes(plan)) {
    document.querySelector('[data-plan-input]').value = plan;
    const message = document.querySelector('#message');
    if (!message.value) message.value = `I would like to discuss the ${plan.charAt(0).toUpperCase() + plan.slice(1)} website care plan.\n\nMy website: `;
  }
}

const briefForm = document.querySelector('[data-brief-form]');
if (briefForm) {
  const button = briefForm.querySelector('[data-copy-brief]');
  const status = briefForm.querySelector('.form-status');
  const copy = async () => {
    if (!briefForm.reportValidity()) return;
    const data = new FormData(briefForm);
    const selectedService = serviceInput?.selectedOptions[0]?.textContent || 'Not sure yet';
    const lines = ['Project enquiry for CodeView Solutions', '', `Name: ${data.get('name') || 'Not provided'}`, `Email: ${data.get('email') || 'Not provided'}`, `Company: ${data.get('company') || 'Not provided'}`, `Service: ${selectedService}`];
    if (data.get('plan')) lines.push(`Website plan: ${data.get('plan')}`);
    lines.push('', String(data.get('message') || ''));
    const text = lines.join('\n');
    const output = document.querySelector('.brief-output');
    const result = document.querySelector('#brief-result');
    output.hidden = false;
    result.value = text;
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = 'Brief copied. Nothing has been sent. Call us when you’re ready to discuss it.';
    } catch {
      status.textContent = 'Your brief is ready below. Select and copy it, then call us to discuss it.';
      result.focus();
      result.select();
    }
  };
  button.hidden = false;
  button.addEventListener('click', copy);
  briefForm.addEventListener('submit', event => { event.preventDefault(); copy(); });
}

const connectedForm = document.querySelector('[data-contact-form]');
if (connectedForm) {
  connectedForm.addEventListener('submit', async event => {
    event.preventDefault();
    const button = connectedForm.querySelector('button[type="submit"]');
    const status = connectedForm.querySelector('.form-status');
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your enquiry…';
    try {
      const response = await fetch(connectedForm.action, { method: 'POST', body: new FormData(connectedForm), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Request failed');
      connectedForm.reset();
      status.textContent = 'Your enquiry has been sent. We’ll reply within one business day.';
    } catch {
      status.textContent = 'We couldn’t send your enquiry. Your details are still here. Please try again or call (732) 654-9519.';
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  });
}
