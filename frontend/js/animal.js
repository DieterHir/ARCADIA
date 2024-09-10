let apiUrl = "http://localhost:8000/animal/";

let path = window.location.pathname;
let id = path.split('/').pop();

let image = document.getElementById('image');
let name = document.getElementById('name');
let species = document.getElementById('species');
let age = document.getElementById('age');
let habitat = document.getElementById('habitat');
let state = document.getElementById('state');
let stateReview = document.getElementById('stateReview');
let lastMeal = document.getElementById('lastMeal');
let lastVetVisit = document.getElementById('lastVetVisit');

function displayInformations(id) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    fetch(apiUrl + `${id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                alert("Erreur dans la récupération des données");
            }

            return response.json();
        })
        .then(animal => {
            image.innerHTML = `<img src="/images/${animal.image}" class="rounded" alt="photo de ${animal.name}"/>`;
            name.innerHTML = `<span class="secondary">Nom :</span> ${animal.name}`;
            species.innerHTML = `<span class="secondary">Race :</span> ${animal.species}`;
            age.innerHTML = `<span class="secondary">Age :</span> ${animal.age}`;
            //habitat.innerHTML = `Habitat: ${animal.habitat}`;
            // if (animal.state !== null && animal.stateReview !== null) {
            state.innerHTML = `<h2 class="secondary">Etat:</h2> ${animal.state}`;
            stateReview.innerHTML = `<h2 class="secondary">Commentaire:</h2> ${animal.stateReview}`;
            // }
            if (animal.lastMeal !== null && animal.lastMealQty != null) {
                lastMeal.innerHTML = `Dernier repas: ${animal.lastMealQty}g de ${animal.lastMeal}`;
            }
            if (animal.lastVetVisit !== null) {
                let dateLastVisit = animal.lastVetVisit.date;
                let cleanDate = dateLastVisit.split('.')[0];

                let [datePart, timePart] = cleanDate.split(' ');
                let [year, month, day] = datePart.split('-');
                let [hours, minutes] = timePart.split(':');

                let formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;

                lastVetVisit.innerHTML = `<span class="secondary">Date de dernier passage de l'équipe vétérinaire :</span> ${formattedDate}`;
            }
        })
        .catch(error => console.error("Erreur: ", error));
}

displayInformations(id);