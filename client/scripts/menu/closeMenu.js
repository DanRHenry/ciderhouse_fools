export function closeMenu(closeMenuState) {
closeMenuState()
  const sideMenu = document.getElementById("sideMenu");
  if (sideMenu) {
    sideMenu.style.width = "0%";
  }
}
