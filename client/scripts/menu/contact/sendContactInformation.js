import { serverURL } from "../../helpers/serverURL.js";
export async function sendContactInformation(name, email, phone, message) {
  try {
    const url = serverURL + "/email/send";
    console.log("url: ", url);

    let message_body = {
      from: email,
      to: "rprattcomic@gmail.com",
      subject: "ciderhouse fools incoming contact message",
      html: `<div>A message from ${name}</div><div>Phone#: <a href="tel:+${phone}">${phone}</a></div><div>Reply Address: ${email}</div><div>--------message--------</div><div>${message}</div>`,
      text: `Message got`,
    };

    const headers = {
      "content-type": "application/json",
    };

    let reqOptions = {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({ message: message_body }),
    };

    const res = await fetch(url, reqOptions);

    console.log(res);
    const contactMeContent = document.createElement("div");
    contactMeContent.id = "contactMeContent";
    contactMeContent.style.textAlign = "center";

    if (res.ok) {
      document.getElementById("subMenu")?.remove();
      contactMeContent.style.borderTop = "1px solid green";
      contactMeContent.innerHTML = `<div>Message Sent</div>`;
    } else {
      contactMeContent.style.borderTop = "1px solid red";
      contactMeContent.innerHTML = `<div>Error Sending, Please Try Again Later</div>`;
    }
    document.getElementById("pageContent").after(contactMeContent);
    setTimeout(() => {
      contactMeContent?.remove();
    }, 3000);
  } catch (err) {
    console.error(err);
  }
}