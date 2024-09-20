let apiUrl = "http://localhost:8000/review/";
let urlHabitat = "http://localhost:8000/habitat/"
let urlAnimals = "http://localhost:8000/animal/";
let urlServices = "http://localhost:8000/services/";

let reviewCommentary = document.getElementById("commentary");
let reviewVisitor = document.getElementById("visitor");
let reviewDate = document.getElementById("reviewDate");

let buttonPreviousReview = document.getElementById("previousReview");
buttonPreviousReview.addEventListener("click", previousReview);
let buttonNextReview = document.getElementById("nextReview");
buttonNextReview.addEventListener("click", nextReview);

let habitatName = document.getElementById('habitatName');
let habitatImage = document.getElementById('habitatImage');
let habitatDescription = document.getElementById('habitatDescription');
let habitatButton = document.getElementById('habitatButton');

let buttonPreviousHabitat = document.getElementById("previousHabitat");
buttonPreviousHabitat.addEventListener("click", previousHabitat);
let buttonNextHabitat = document.getElementById("nextHabitat");
buttonNextHabitat.addEventListener("click", nextHabitat);

let animalImage = document.getElementById('animalImage');

let buttonPreviousAnimal = document.getElementById("previousAnimal");
buttonPreviousAnimal.addEventListener("click", previousAnimal);
let buttonNextAnimal = document.getElementById("nextAnimal");
buttonNextAnimal.addEventListener("click", nextAnimal);

let serviceImage = document.getElementById('serviceImage');
let serviceName = document.getElementById('serviceName');
let serviceDescription = document.getElementById('serviceDescription');

let buttonPreviousService = document.getElementById('previousService');
buttonPreviousService.addEventListener("click", previousService);
let buttonNextService = document.getElementById('nextService');
buttonNextService.addEventListener("click", nextService);

let reviews = [];
let habitats = [];
let animals = [];
let services = [];

function getReviews() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(apiUrl + "displayReviews", requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(review => {
                if (review.state === "checked") {
                    reviews.push(review);
                }
            });
        })
        .then(data => {
            displayReviews();
        })
        .catch(error => console.error("Erreur: ", error));
}

function displayReviews(number) {
    if (number === "" || number === undefined) {
        reviewCommentary.textContent = `« ${reviews[0].message} »`;
        reviewVisitor.textContent = reviews[0].visitor_name;
        reviewDate.textContent = new Date(reviews[0].createdAt.date).toLocaleDateString();
        reviewCommentary.data_id = 0;
    } else {

        reviewCommentary.textContent = reviews[number].message;
        reviewVisitor.textContent = reviews[number].visitor_name;
        reviewDate.textContent = new Date(reviews[number].createdAt.date).toLocaleDateString();
        reviewCommentary.data_id = number;
    }
}

function previousReview() {
    let currentReview = reviewCommentary.data_id;

    if (currentReview > 0) {
        currentReview -= 1;
    } else {
        currentReview = 0;
    }

    displayReviews(currentReview);
}

function nextReview() {
    let currentReview = reviewCommentary.data_id;

    if (currentReview < reviews.length) {
        currentReview += 1;
    } else {
        currentReview = 0;
    }

    displayReviews(currentReview);
}

function getHabitats() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(urlHabitat + "getHabitats", requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(habitat => {
                habitats.push(habitat);
            });
        })
        .then(data => {
            displayHabitats();
        })
        .catch(error => console.error("Erreur: ", error));
}

function displayHabitats(number) {
    if (number === "" || number === undefined) {
        habitatName.textContent = habitats[0].name;
        habitatImage.src = `../images/${habitats[0].image}`;
        habitatDescription.textContent = `« ${habitats[0].description} »`;
        habitatButton.href = `/habitats/animalsList/${habitats[0].id}`;
        habitatButton.textContent = "Découvrez mes habitants";
        habitatName.data_id = 0;
    } else {
        habitatName.textContent = habitats[number].name;
        habitatImage.src = `../images/${habitats[number].image}`;
        habitatDescription.textContent = `« ${habitats[number].description} »`;
        habitatButton.href = `/habitats/animalsList/${habitats[number].id}`;
        habitatButton.textContent = "Découvrez mes habitants";
        habitatName.data_id = number;
    }
}

function previousHabitat() {
    let currentHabitat = habitatName.data_id;

    if (currentHabitat > 0) {
        currentHabitat -= 1;
    } else {
        currentHabitat = 0;
    }

    displayHabitats(currentHabitat);
}

function nextHabitat() {
    let currentHabitat = habitatName.data_id;

    if (currentHabitat < habitats.length - 1) {
        currentHabitat += 1;
    } else {
        currentHabitat = 0;
    }

    displayHabitats(currentHabitat);
}

function getAnimals() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(urlAnimals + "getAnimals", requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(animal => {
                animals.push(animal);
            });
        })
        .then(data => {
            displayAnimals();
        })
        .catch(error => console.error("Erreur: ", error));
}

function displayAnimals(number) {
    if (number === "" || number === undefined) {
        animalImage.src = `../images/${animals[0].image}`;
        animalImage.data_id = 0;
        animalButton.href = `/animal/${animals[0].id}`;
        animalButton.textContent = "Voir plus";
    } else {
        animalImage.src = `../images/${animals[number].image}`;
        animalImage.data_id = number;
        animalButton.href = `/animal/${animals[number].id}`;
        animalButton.innerHTML = `<button class="button" id="animalButton">Voir plus</button>`;
    }
}

function previousAnimal() {
    let currentAnimal = animalImage.data_id;

    if (currentAnimal > 0) {
        currentAnimal -= 1;
    } else {
        currentAnimal = 0;
    }

    displayAnimals(currentAnimal);
}

function nextAnimal() {
    let currentAnimal = animalImage.data_id;

    if (currentAnimal < animals.length - 1) {
        currentAnimal += 1;
    } else {
        currentAnimal = 0;
    }

    displayAnimals(currentAnimal);
}

function getServices() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(urlServices + "getServices", requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(service => {
                services.push(service);
            });
        })
        .then(data => {
            displayServices();
        })
        .catch(error => console.error("Erreur: ", error));
}

function displayServices(number) {
    if (number === "" || number === undefined) {
        serviceImage.src = `../images/${services[0].image}`;
        serviceImage.data_id = 0;
        serviceName.textContent = services[0].name;
        serviceDescription.textContent = `« ${services[0].description} »`;
    } else {
        serviceImage.src = `../images/${services[number].image}`;
        serviceImage.data_id = number;
        serviceName.textContent = services[number].name;
        serviceDescription.textContent = `« ${services[number].description} »`;
    }
}

function previousService() {
    let currentService = serviceImage.data_id;

    if (currentService > 0) {
        currentService -= 1;
    } else {
        currentService = 0;
    }

    displayServices(currentService);
}

function nextService() {
    let currentService = serviceImage.data_id;

    if (currentService < services.length - 1) {
        currentService += 1;
    } else {
        currentService = 0;
    }

    displayServices(currentService);
}

window.addEventListener("DOMContentLoaded", getReviews());
window.addEventListener("DOMContentLoaded", getHabitats());
window.addEventListener("DOMContentLoaded", getAnimals());
window.addEventListener("DOMContentLoaded", getServices());