import { createMenu } from "./menu/createMenu.js";
const serverURL = "http://127.0.0.1:5432";
const menuBtn = document.getElementById("menuBtn");
const menuItems = {
  about: (subMenu) => {
    const header = document.createElement("div");
    header.innerText = "about this fucking guy";
    const paragraph = document.createElement("p");
    paragraph.id = "aboutMeParagraph";
    paragraph.innerText = "fucking paragraph";
    subMenu.append(header, paragraph);
    closeMenu();
  },
  calendar: (subMenu) => {
    const calendarHeader = document.createElement("div");
    calendarHeader.innerText = "fucking calendar";

    const calendarContainer = document.createElement("div");
    calendarContainer.id = "calendarContainer";
    const calendarGrid = document.createElement("div");
    calendarGrid.id = "calendar";

    calendarContainer.append(calendarHeader, calendarGrid);

    buildCalendar(calendarGrid);

    subMenu.append(calendarContainer);
    closeMenu();
  },
  media: (subMenu) => {
    const images = [
      {
        url: "#",
        alt: "image 1",
      },
      {
        url: "#",
        alt: "image 2",
      },
      {
        url: "#",
        alt: "image 3",
      },
      {
        url: "#",
        alt: "image 4",
      },
      {
        url: "#",
        alt: "image 5",
      },
    ];

    const header = document.createElement("div");
    header.innerText = "fucking pictures";

    subMenu.append(header);
    for (let i = 0; i < images.length; i++) {
      const image = document.createElement("img");
      image.src = images[i].url;
      image.alt = images[i].alt;
      subMenu.append(image);
    }

    closeMenu();
  },
  links: (subMenu) => {
    const linksSection = document.createElement("div");
    linksSection.id = "linksSection";
    const links = [
      {
        url: "#",
        description: "link 1",
      },
      {
        url: "#",
        description: "link 2",
      },
      {
        url: "#",
        description: "link 3",
      },
      {
        url: "#",
        description: "link 4",
      },
    ];

    subMenu.innerText = "fucking links";

    for (let i = 0; i < links.length; i++) {
      const link = document.createElement("a");
      link.href = links[i].url;
      link.innerText = links[i].description;
      linksSection.append(link);
    }
    subMenu.append(linksSection);
    closeMenu();
  },
  contact: (subMenu) => {
    const contactHeader = document.createElement("div");
    contactHeader.innerText = "Contact This Fucking Guy";
    const contactForm = document.createElement("form");
    contactForm.name = "contact";
    contactForm.id = "contact";
    contactForm.addEventListener("submit", submitContactForm);

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("for", contactForm);
    submitBtn.innerText = "Submit";

    const nameField = document.createElement("input");
    nameField.name = "name";
    nameField.type = "text";
    nameField.required = "true";
    nameField.placeholder = "name";
    nameField.autocomplete = "false";

    const emailField = document.createElement("input");
    emailField.name = "email";
    emailField.type = "email";
    emailField.required = "true";
    emailField.placeholder = "email";
    emailField.autocomplete = "false";

    const phoneField = document.createElement("input");
    phoneField.name = "phone";
    phoneField.type = "phone";
    phoneField.required = "true";
    phoneField.placeholder = "phone";
    phoneField.autocomplete = "false";

    const messageBox = document.createElement("textarea");
    messageBox.name = "message";
    messageBox.required = "true";
    messageBox.placeholder = "message";
    messageBox.autocomplete = "false";

    const contactSection = document.createElement("div");
    contactSection.id = "contactSection";

    contactForm.append(
      nameField,
      emailField,
      phoneField,
      messageBox,
      submitBtn,
    );

    contactSection.append(contactHeader, contactForm);
    subMenu.append(contactSection);
    closeMenu();
  },
};

function submitContactForm(e) {
  const [name, email, phone, message] = e.target.elements;
  sendContactInformation(name.value, email.value, phone.value, message.value);
  e.preventDefault();
}
let menuState = false;

function handleMenuClick(e) {
  let element;

  if (e.target.childNodes[0]) {
    element = e.target.childNodes[0];
  } else {
    element = e.target;
  }
  let rotation = "0deg";

  if (menuState === false) {
    rotation = "45deg";
    menuState = true;
    createMenu(document.querySelector("body"), menuItems);
    setTimeout(() => {
      document.getElementById("sideMenu").style.width =
        "calc-size(fit-content, size + 20vw)";
    }, 1);
  } else {
    closeMenu();
  }

  if (e.target.childNodes[0].id) {
    element.style.display = "inline-block";
    element.style.transform = `rotate(${rotation})`;
  } else {
    element.parentNode.style.display = "inline-block";
    element.parentNode.style.transform = `rotate(${rotation})`;
  }
}

const item = document.createElement("div");
item.setAttribute("active", true);

menuBtn.addEventListener("click", handleMenuClick);

function closeMenu() {
  menuState = false;
  const sideMenu = document.getElementById("sideMenu");
  sideMenu.style.width = "0%";
}

function buildCalendar() {}

async function sendContactInformation(name, email, phone, message) {
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
    const contactMeContent = document.createElement("div")
    contactMeContent.id = "contactMeContent"
    contactMeContent.style.textAlign = "center"

    if (res.ok) {
        document.getElementById("subMenu")?.remove()
      contactMeContent.style.borderTop = "1px solid green"
      contactMeContent.innerHTML = `<div>Message Sent</div>`

    } else {
      contactMeContent.style.borderTop = "1px solid red"
      contactMeContent.innerHTML = `<div>Error Sending, Please Try Again Later</div>`
    }
      document.getElementById("pageContent").after(contactMeContent)
      setTimeout(() => {
        contactMeContent?.remove()
      }, 3000);
  } catch (err) {
    console.error(err);
  }
}
