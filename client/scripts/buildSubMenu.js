import { menuItems } from "./menu/menuItems.js";

export function buildSubmenu(item, closeMenuState) {
  document.getElementById("subMenu")?.remove();
  const subMenu = document.createElement("div");
  subMenu.id = "subMenu";
  document.querySelector("#pageContent").append(subMenu);
  menuItems(closeMenuState)[item](subMenu);
}
