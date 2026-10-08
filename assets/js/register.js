/* Integration TODO: register through a secure provider/server, with server validation.
 * Never store passwords in browser storage or embed private API credentials. */
'use strict';
function registrationError(name, value, password = '') {
  const text = String(value || '');
  if (name === 'name' && text.trim().length < 2) return 'Enter a contact name using at least 2 characters.';
  if (name === 'business' && text.trim().length < 2) return 'Enter your business name using at least 2 characters.';
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) return 'Enter a valid business email, such as name@example.com.';
  if (name === 'phone' && text.trim() && (!/^[+()\d\s.-]+$/.test(text.trim()) || text.replace(/\D/g,'').length < 7 || text.replace(/\D/g,'').length > 15)) return 'Enter a phone number with 7–15 digits, or leave it blank.';
  if (name === 'password' && (!text.trim() || text.length < 12)) return 'Choose a password with at least 12 characters.';
  if (name === 'confirm' && (!text || text !== password)) return 'Enter the same password in both password fields.';
  if (name === 'terms' && value !== true) return 'Read and accept the account terms and privacy notice to continue.';
  return '';
}
(() => {
  const form = document.getElementById('business-register-form');
  if (!form) return;
  const fields = [...form.querySelectorAll('input')];
  const password = document.getElementById('register-password');
  const confirm = document.getElementById('register-confirm');
  const status = document.getElementById('register-status');
  const summary = document.getElementById('register-error-summary');
  const errorFor = field => registrationError(field.name, field.type === 'checkbox' ? field.checked : field.value, password.value);
  function showError(field, message) {
    field.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(field.id + '-error').textContent = message;
  }
  fields.forEach(field => field.addEventListener(field.type === 'checkbox' ? 'change' : 'input', () => {
    if (field.getAttribute('aria-invalid') === 'true' || field.type === 'checkbox') showError(field, errorFor(field));
    if (field === password && confirm.value) showError(confirm, errorFor(confirm));
    status.textContent = '';
  }));
  document.querySelectorAll('[data-password-target]').forEach(button => button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.passwordTarget);
    const visible = input.type === 'password';
    input.type = visible ? 'text' : 'password';
    const label = input === password ? 'password' : 'confirmed password';
    button.setAttribute('aria-label', (visible ? 'Hide ' : 'Show ') + label);
    button.setAttribute('aria-pressed', String(visible));
    button.replaceChildren();
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', visible ? 'eye-off' : 'eye');
    button.append(icon);
    if (window.lucide) window.lucide.createIcons();
    button.querySelector('svg')?.setAttribute('aria-hidden','true');
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = '';
    let count = 0;
    let firstInvalid = null;
    fields.forEach(field => {
      const error = errorFor(field);
      showError(field, error);
      if (error) { count++; firstInvalid ||= field; }
    });
    summary.hidden = count === 0;
    summary.textContent = count ? `Please correct ${count} ${count === 1 ? 'field' : 'fields'} below. No account has been created.` : '';
    if (firstInvalid) { firstInvalid.focus(); return; }
    // TODO: replace this local result with an approved server-backed registration flow.
    status.textContent = 'Your details passed validation. Registration is not connected, so no account was created and no information was sent or stored.';
  });
  window.addEventListener('pagehide', () => { password.value = ''; confirm.value = ''; });
})();
