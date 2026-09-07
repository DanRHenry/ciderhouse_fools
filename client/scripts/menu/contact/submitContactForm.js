import { sendContactInformation } from "./sendContactInformation.js";

export function submitContactForm(e) {
  e.preventDefault()
  const [name, email, phone, message] = e.target.elements;
  sendContactInformation(name.value, email.value, phone.value, message.value);
}