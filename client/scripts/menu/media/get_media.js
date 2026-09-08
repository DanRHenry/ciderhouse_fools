import { serverURL } from "../../helpers/serverURL.js";
const mimeType = "image/png"

console.log(serverURL)
export async function get_media() {
console.log("getting media...")

const url = `${serverURL}/photolistings/6-19-2026/four_phantoms/700872214_10229879206146273_16108721847516188_n.jpg`

console.log(url)

    const res = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application-JSON",
            "authorization": sessionStorage.token
        }
    })
    console.log(res)
    const data = await res.json()
    const base64Data = data.uri.replace(/^data:.+;base64,/, '');
    const byteCharacters = atob(base64Data); // Decode Base64 string
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    const imageURL = URL.createObjectURL(blob)

    console.log(imageURL)
}