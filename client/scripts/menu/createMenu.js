import { buildSubmenu } from "../buildSubMenu.js";
import { closeMenu } from "./closeMenu.js";
import { menuItems } from "./menuItems.js";
export function createMenu(target, menuItems, closeMenuState) {
  setTimeout(() => {
    document.addEventListener("click", close);
  }, 1);

  function close(e) {
    if (e.target.id !== "sideMenu") {
      console.log("closing side menu")
      closeMenu(closeMenuState);
      document.removeEventListener("click", close);
    }
  }

  document.getElementById("sideMenu")?.remove();

  const menuPanel = document.createElement("aside");
  menuPanel.id = "sideMenu";
  menuPanel.style.width = "0%";
  menuPanel.style.transition = ".25s ease";
  menuPanel.style.boxSizing = "border-box";
  target.append(menuPanel);

  for (let item in menuItems) {
    const link = document.createElement("div");
    link.innerText = item;
    link.className = "menuItems";
    link.addEventListener("click", () => {
      buildSubmenu(item, closeMenuState);
    });
    menuPanel.append(link);
  }
}
