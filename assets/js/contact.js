/* TODO: use an approved Formspree endpoint or same-origin form API. Never embed secret keys. */
'use strict';
const contactEndpoint = '';
function contactFieldError(name, value) {
  const text = String(value || '').trim();
  if (name === 'name' && text.length < 2) return 'Enter your name using at least 2 characters.';
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return 'Enter a valid email address, such as name@example.com.';
  if (name === 'phone' && text && (!/^[+()\d\s.-]+$/.test(text) || text.replace(/\D/g, '').length < 7 || text.replace(/\D/g, '').length > 15)) return 'Enter a phone number with 7–15 digits, or leave this optional field blank.';
  if (name === 'inquiry_type' && !['General question','Business delivery','Recurring pickups','Coverage request','Parcel requirements'].includes(text)) return 'Choose an inquiry type.';
  if (name === 'message' && text.length < 10) return 'Tell us a little more using at least 10 characters.';
  if (name === 'message' && text.length > 2000) return 'Keep your message within 2,000 characters.';
  return '';
}
(() => {
  const form = document.getElementById('inquiry-form');
  if (!form) return;
  const fields = [...form.querySelectorAll('input,select,textarea')];
  const status = document.getElementById('inquiry-status');
  const summary = document.getElementById('inquiry-errors');
  const submit = document.getElementById('inquiry-submit');
  const errorFor = field => contactFieldError(field.name, field.value);
  function showError(field, message) {
    field.setAttribute('aria-invalid', String(Boolean(message)));
    document.getElementById(field.id + '-error').textContent = message;
  }
  fields.forEach(field => field.addEventListener(field.tagName === 'SELECT' ? 'change' : 'input', () => {
    if (field.getAttribute('aria-invalid') === 'true') showError(field, errorFor(field));
    status.textContent = '';
  }));
  if (contactEndpoint) {
    document.getElementById('inquiry-note').textContent = 'Use this form for delivery questions. Required fields are labeled.';
    submit.firstChild.textContent = 'Send inquiry ';
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled) return;
    status.textContent = '';
    let firstInvalid = null;
    let count = 0;
    fields.forEach(field => {
      const message = errorFor(field);
      showError(field, message);
      if (message) { count++; firstInvalid ||= field; }
    });
    summary.hidden = count === 0;
    summary.textContent = count ? `Please correct ${count} ${count === 1 ? 'field' : 'fields'} below. Your inquiry has not been sent.` : '';
    if (firstInvalid) { firstInvalid.focus(); return; }
    if (!contactEndpoint) {
      status.textContent = 'Your inquiry is ready. The form is not connected, so no message has been sent or stored.';
      return;
    }
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your inquiry…';
    try {
      const response = await fetch(contactEndpoint, {method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if (!response.ok) throw new Error('Provider rejected the inquiry');
      status.textContent = 'Your inquiry was accepted by the contact provider. Thank you.';
      form.reset();
    } catch (error) {
      status.textContent = 'The inquiry could not be confirmed. Your text is still here; please try again.';
    } finally {
      submit.disabled = false;
      form.setAttribute('aria-busy', 'false');
    }
  });
})();
