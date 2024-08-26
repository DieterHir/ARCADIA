let habitatName = document.getElementById("name");
let habitatDescription = document.getElementById("description");
let habitatImage = document.getElementById("image");

let newHabitatButton = document.getElementById("new");

function addHabitat() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "name": habitatName.value,
        "description": habitatDescription.value,
        "image": habitatImage.value
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    }
}