/* Integration points: attach server-backed authentication and password recovery.
 * Never store passwords in localStorage or expose provider secrets in this file.
 * Remember-me should control the secure server session lifetime when connected. */
'use strict';
function businessLoginError(field, value) {
  const text = String(value || '');
  if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) return 'Enter a valid business email, such as name@example.com.';
  if (field === 'password' && !text.trim()) return 'Enter your password.';
  return '';
}
(() => {
  const form = document.getElementById('business-login-form');
  if (!form) return;
  const email = document.getElementById('business-email');
  const password = document.getElementById('business-password');
  const summary = document.getElementById('login-error-summary');
  const status = document.getElementById('business-login-status');
  const visibility = document.getElementById('password-visibility');
  function showError(field, message) {
    field.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(field.id + '-error').textContent = message;
  }
  [email, password].forEach(field => field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') showError(field, businessLoginError(field.name, field.value));
    status.textContent = '';
  }));
  visibility.addEventListener('click', () => {
    const visible = password.type === 'password';
    password.type = visible ? 'text' : 'password';
    visibility.setAttribute('aria-pressed', String(visible));
    visibility.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
    visibility.replaceChildren();
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', visible ? 'eye-off' : 'eye');
    visibility.append(icon);
    if (window.lucide) window.lucide.createIcons();
    visibility.querySelector('svg')?.setAttribute('aria-hidden','true');
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = '';
    let firstInvalid = null;
    let count = 0;
    [email, password].forEach(field => {
      const message = businessLoginError(field.name, field.value);
      showError(field, message);
      if (message) { firstInvalid ||= field; count++; }
    });
    summary.hidden = count === 0;
    summary.textContent = count ? `Please correct ${count} ${count === 1 ? 'field' : 'fields'} below.` : '';
    if (firstInvalid) { firstInvalid.focus(); return; }
    // TODO: replace with your approved authentication flow and server-side validation.
    status.textContent = 'The fields are valid. Sign-in is not connected, so no account session has been created. Your password has not been sent or stored.';
    // Open the frontend dashboard after local validation; no authentication is performed.
    window.location.assign('dashboard.html');
  });
  const resetForm = document.getElementById('password-reset-form');
  const resetEmail = document.getElementById('reset-email');
  const resetStatus = document.getElementById('reset-status');
  resetEmail.addEventListener('input', () => {
    if (resetEmail.getAttribute('aria-invalid') === 'true') showError(resetEmail, businessLoginError('email', resetEmail.value));
    resetStatus.textContent = '';
  });
  resetForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = businessLoginError('email', resetEmail.value);
    showError(resetEmail, message);
    resetStatus.textContent = '';
    if (message) { resetEmail.focus(); return; }
    // TODO: use a server/provider recovery endpoint with a neutral response for account privacy.
    resetStatus.textContent = 'The email format is valid. Password recovery is not connected, so no reset email was sent.';
  });
  window.addEventListener('pagehide', () => { password.value = ''; });
})();
