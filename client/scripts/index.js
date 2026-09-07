import { createMenu } from "./menu/createMenu.js";
import { buildSubmenu } from "./buildSubMenu.js";
import { menuItems } from "./menu/menuItems.js";
import { closeMenu } from "./menu/closeMenu.js";
const serverURL = "http://127.0.0.1:5432";
const copyright = document.getElementById("copyright");
const date = new Date().getFullYear();
copyright.innerHTML = `&copy;${date} `;

(function buildNavLinks() {
  const nav = document.querySelector("nav");
  const navLinks = document.createElement("div");
  navLinks.id = "navLinks";

  for (let item in menuItems(closeMenuState)) {
    const navLink = document.createElement("div");
    navLink.innerText = item;
    navLink.className = "navMenuItems";
    navLink.addEventListener("click", (item) => {
      buildSubmenu(item.target.innerText, closeMenuState);
    });
    navLinks.append(navLink);
  }
  const btn = document.createElement("button");
  btn.id = "menuBtn";
  btn.addEventListener("click", handleMenuClick);

  const btnTxt = document.createElement("span");
  btnTxt.id = "menuIcon";
  btnTxt.innerText = "+";

  btn.append(btnTxt);

  nav.append(navLinks);
  nav.after(btn);
})();

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
    createMenu(
      document.querySelector("body"),
      menuItems(closeMenuState),
      closeMenuState,
    );
    setTimeout(() => {
      document.getElementById("sideMenu").style.width =
        "calc-size(fit-content, size + 20vw)";
    }, 1);
  } else {
    closeMenu(closeMenuState);
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

function closeMenuState() {
  return (menuState = false);
}
