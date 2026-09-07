import { buildCalendar } from "./calendar/buildCalendar.js";
import { submitContactForm } from "./contact/submitContactForm.js";
import { closeMenu } from "./closeMenu.js";
import { calendar_events } from "./calendar/calendar_events.js";
import { events_media } from "./media/events_media.js";
import { links } from "./links/links.js";

export function menuItems(closeMenuState) {
  const menuItems = {
    home: (parent) => {
      const announcementItems = [
        "Some shit",
        "some more shit",
        "even more shit",
      ];

      const announcementHeader = document.createElement("div");
      announcementHeader.innerText = "Updates and shit";
      announcementHeader.className = "headers";

      const announcementsSection = document.createElement("div");

      const announcementsList = document.createElement("ul");

      for (let i = 0; i < announcementItems.length; i++) {
        const announcement = document.createElement("li");
        announcement.innerText = announcementItems[i];
        announcementsList.append(announcement);
      }

      //   const announcementParagraph = document.createElement("p");
      //   announcementParagraph.innerText = "Some shit";

      announcementsSection.append(announcementsList);
      parent.append(announcementHeader, announcementsSection);
    },
    about: (parent) => {
      const header = document.createElement("div");
      header.innerText = "about this fucking guy";
      header.className = "headers";

      const paragraph = document.createElement("p");
      paragraph.id = "aboutMeParagraph";
      paragraph.innerText = "fucking paragraph";

      const pictureSection = document.createElement("div");

      const picturesItems = [
        {
          url: "#",
          alt: "picture 1",
        },
        {
          url: "#",
          alt: "picture 2",
        },
        {
          url: "#",
          alt: "picture 3",
        },
      ];

      for (let i = 0; i < picturesItems.length; i++) {
        const img = document.createElement("img");
        img.href = picturesItems[i].url;
        img.alt = picturesItems[i].alt;
        pictureSection.append(img);
      }

      parent.append(header, pictureSection, paragraph);
      closeMenu(closeMenuState);
    },
    calendar: (parent) => {
        const events = calendar_events
      const calendarHeader = document.createElement("div");
      calendarHeader.innerText = "fucking calendar";
      calendarHeader.className = "headers";

      const calendarContainer = document.createElement("div");
      calendarContainer.id = "calendarContainer";

      const upcomingSection = document.createElement("div");

      const upcomingEventsList = document.createElement("ul");

      for (let i = 0; i < events.length; i++) {
        const line = document.createElement("li");
        line.innerText = `${events[i].text} `;
        const desc = document.createElement("div");
        desc.innerText = events[i].text;

        if (events[i].link) {
          const btn = document.createElement("a");
          btn.innerText = events[i].link.textContent;
          btn.href = events[i].link.url;
          line.append(btn);
        }
        upcomingEventsList.append(line);
      }

      calendarContainer.append(upcomingEventsList);

      parent.append(calendarContainer);
      closeMenu(closeMenuState);
    },
    media: (parent) => {
      const mediaSection = document.createElement("div");
      mediaSection.id = "mediaSection";

      const events = events_media

      const header = document.createElement("div");
      header.innerText = "fucking pictures";
      header.className = "headers";

      parent.append(header);
      for (let i = 0; i < Object.keys(events).length; i++) {
          const event = events[Object.keys(events)[i]];
        console.log(event);

        const eventHeader = document.createElement("div");
        eventHeader.className = "headers";
        eventHeader.innerText = event.name;

        const date = document.createElement("div")
        date.innerText = event.date

        mediaSection.append(eventHeader, date)
        for (let i = 0; i < event.media.length; i++) {
            const media = event.media[i]

            console.log(media.url)
            console.log(media.alt)

            const image = document.createElement("img")
            image.src = media.url;
            image.alt = media.alt;
            console.log("image:",image)
            mediaSection.append(image)
        }
      }

      closeMenu(closeMenuState);
      parent.append(mediaSection);
    },
    links: (parent) => {
      const linksSection = document.createElement("div");
      linksSection.id = "linksSection";

      const linksHeader = document.createElement("div");
      linksHeader.innerText = "fucking links";
      linksHeader.className = "headers";

      for (let i = 0; i < links.length; i++) {
        const link = document.createElement("a");
        link.href = links[i].url;
        link.innerText = links[i].description;
        linksSection.append(link);
      }
      parent.append(linksHeader, linksSection);
      closeMenu(closeMenuState);
    },
    contact: (parent) => {
      const contactHeader = document.createElement("div");
      contactHeader.innerText = "Contact This Fucking Guy";
      contactHeader.className = "headers";

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
      parent.append(contactSection);
      closeMenu(closeMenuState);
    },
  };
  return menuItems;
}
