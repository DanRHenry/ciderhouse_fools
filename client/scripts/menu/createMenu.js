export function createMenu(target, menuItems) {
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
      document.getElementById("subMenu")?.remove();
      const subMenu = document.createElement("div");
      subMenu.id = "subMenu";
      document.querySelector("#pageContent").append(subMenu);
      menuItems[item](subMenu);
    });
    menuPanel.append(link);
  }
}
