export function openLargeImage(src, alt) {
    const subMenu = document.getElementById("subMenu")

    const imageContainer = document.createElement("div")
    imageContainer.style.backgroundColor = "rgba(255, 255, 255, 0);"
    imageContainer.style.position = "fixed"
    imageContainer.style.top = "0"
    imageContainer.style.height = "100vh"
    imageContainer.style.width = "100vw"
    imageContainer.style.display = "flex"
    imageContainer.style.flexDirection = "row"
    imageContainer.style.justifyContent = "center"
    imageContainer.style.alignItems = "center"
    
    const image = document.createElement("img")
    image.src = src
    image.alt = alt
    image.style.maxHeight = "100vh"
    image.style.maxWidth = "100vw"

    imageContainer.append(image)
    subMenu.append(imageContainer)

    document.addEventListener("click", closeImage)
    image.addEventListener("click", () => imageContainer.remove())

    function closeImage(e) {
        if (e.target.src !== src) {
            imageContainer.remove()
            document.removeEventListener("click", closeImage)
        }
    }
}