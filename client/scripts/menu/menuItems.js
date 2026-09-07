import { buildCalendar } from "./calendar/buildCalendar.js";
import { submitContactForm } from "./contact/submitContactForm.js";
import { closeMenu } from "./closeMenu.js";

export function menuItems(closeMenuState) {
  const menuItems = {
    about: (subMenu) => {
      const header = document.createElement("div");
      header.innerText = "about this fucking guy";
      const paragraph = document.createElement("p");
      paragraph.id = "aboutMeParagraph";
      paragraph.innerText = "fucking paragraph";
      subMenu.append(header, paragraph);
      closeMenu(closeMenuState);
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
      closeMenu(closeMenuState);
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

      closeMenu(closeMenuState);
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
      closeMenu(closeMenuState);
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
      closeMenu(closeMenuState);
    },
  };
  return menuItems;
}
