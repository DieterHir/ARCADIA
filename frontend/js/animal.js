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
let size = document.getElementById('size');
let weight = document.getElementById('weight');

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
            size.innerHTML = `<span class="secondary">Taille:</span> ${animal.size} cm`;
            weight.innerHTML = `<span class="secondary">Poids:</span> ${animal.weight} kg`;

            if (animal.habitat) {
                habitat.innerHTML = `<span class="secondary">Habitat : </span>${animal.habitat}`;
            }

            if (animal.state) {
                state.innerHTML = `<h2 class="secondary">Etat:</h2> ${animal.state}`;
            }

            if (animal.stateReview) {
                stateReview.innerHTML = `<h2 class="secondary">Commentaire:</h2> ${animal.stateReview}`;
            }

            if (animal.lastMeal !== null && animal.lastMealQty != null) {
                lastMeal.innerHTML = `Dernier repas: ${animal.lastMealQty}g de ${animal.lastMeal}`;
            }
            
            if (animal.lastVetVisit) {
                lastVetVisit.innerHTML = `<span class="secondary">Date de dernier passage de l'équipe vétérinaire :</span> ${animal.lastVetVisit}`;
            }
        })
        .then(() => {
            let newHeaders = new Headers();
            newHeaders.append("Content-Type", "application/json");

            let newRequestOptions = {
                method: 'PUT',
                headers: newHeaders
            };

            return fetch("http://localhost:8000/mongoDB/" + `${id}`, newRequestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur dans la mise à jour MongoDB');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Mise à jour MongoDB: ", data.message);
                })
                .catch(error => console.error("Erreur PUT MongoDB: ", error));
        })
        .catch(error => console.error("Erreur: ", error));
}

displayInformations(id);
