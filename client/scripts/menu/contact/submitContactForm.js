export function submitContactForm(e) {
  const [name, email, phone, message] = e.target.elements;
  sendContactInformation(name.value, email.value, phone.value, message.value);
  e.preventDefault();
}