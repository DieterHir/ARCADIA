let apiUrl = "http://localhost:8000/animal/";

let animalsReviewCards = document.getElementById('animalsReviewCards');
let modalList = document.getElementById('modalList');

let animals = [];

function getAnimals() {

    animals = [];
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(apiUrl + "getAnimals", requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(animal => {
                animals.push(animal);
            });
        })
        .then(data => {
            displayAnimals(animals);
        })
        .catch(error => console.error("Erreur: ", error));
}

function displayAnimals(animals) {
    animalsReviewCards.innerHTML = "";
    animals.forEach(animal => {
        let animalDiv = document.createElement('div');
        animalDiv.classList.add('fond-secondary', 'primary', 'animalDiv', 'mb-4', 'd-flex', 'justify-content-stretch', 'flex-column', 'p-3');

        let animalInfos = document.createElement('div');
        animalInfos.classList.add('align-items-center', 'd-flex', 'justify-content-evenly');

        animalInfos.innerHTML = `<a href="/animal/${animal.id}"><img src="/images/${animal.image}" class="rounded" alt="photo de ${animal.name}" style="width: 100px; height: 100px;"/></a>
                                 <p class="text-uppercase">${animal.name}</p>
                                 <p class="text-uppercase">Age: ${animal.age} ans</p>
                                 <p class="text-uppercase">Taille: ${animal.size} cm</p>
                                 <p class="text-uppercase">Poids: ${animal.weight} kg</p>`;
        animalDiv.appendChild(animalInfos);

        let reviewDiv = document.createElement('div');
        reviewDiv.classList.add('fond-secondary', 'd-flex', 'mx-4', 'justify-content-center');

        if (animal.state !== null && animal.state !== "") {
            let dateLastVisit = animal.lastVetVisit.date;
            let cleanDate = dateLastVisit.split('.')[0];

            let [datePart, timePart] = cleanDate.split(' ');
            let [year, month, day] = datePart.split('-');
            let [hours, minutes] = timePart.split(':');

            let formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;

            reviewDiv.classList.remove('justify-content-center');
            reviewDiv.classList.add('justify-content-between');
            let lastReviewDiv = document.createElement('div');
            lastReviewDiv.classList.add('d-flex', 'align-items-center');
            lastReviewDiv.innerHTML = `
            <div>
                <p class="secondary pt-2 pb-0">Dernier état de l'animal : </p>
                <p>${animal.state}</p>
                <p class="secondary pt-2 pb-0">Dernier commentaire vétérinaire : </p>
                <p>${animal.vetReview}</p>
                <p class="secondary pt-2 pb-0">Date de dernier passage : </p>
                <p>${formattedDate}</p>
            </div>`;

            let arrowDiv = document.createElement('h1');
            arrowDiv.classList.add('text-center', 'h1-font', 'secondary', 'align-items-center', 'd-flex');
            arrowDiv.innerHTML = "=>";
            reviewDiv.appendChild(lastReviewDiv);
            reviewDiv.appendChild(arrowDiv);
        }

        let newReviewDiv = document.createElement('div');
        newReviewDiv.classList.add('d-flex', 'align-items-center');
        newReviewDiv.innerHTML = `
        <div>
            <label for="newState" class="primary p-2">Nouvel état de l'animal</label>
            <input type="text" class="form-control" id="newState${animal.id}" aria-describedby="newState">
            <label for="newReview" class="primary p-2">Nouveau commentaire vétérinaire</label>
            <input type="text" class="form-control" id="newReview${animal.id}" aria-describedby="newReview">
        </div>
        <button type="button" class="button ms-5" style="height: 50px;" data-bs-toggle="modal" data-bs-target="#${animal.id}update">Envoyer le nouvel avis</button>
        `;

        let updateModal = `
            <div class="modal fade" id="${animal.id}update" tabindex="-1" aria-labelledby="updateModale" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content fond-primary">
                        <div class="modal-header secondary">
                            <h5 class="modal-title" id="deleteModale">Envoi d'un nouvel avis</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="fond-primary primary login-form d-flex flex-column align-items-center">
                                <label for="name">Êtes-vous sûr de vouloir remplacer l'avis ?</label>
                                <p class="text-danger">Attention, l'ancien avis sera complètement supprimé.</p>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-success btn updateButton" data-bs-dismiss="modal" id="${animal.id}">Confirmer les modifications</button>
                            <button type="button" class="btn-danger btn" data-bs-dismiss="modal">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalList.innerHTML += updateModal;

        reviewDiv.appendChild(newReviewDiv);
        animalDiv.appendChild(reviewDiv);

        animalsReviewCards.appendChild(animalDiv);
    });
    document.querySelectorAll(".updateButton").forEach(button => {
        button.addEventListener("click", function () {
            updateReview(this.id);
        });
    });
}

function updateReview(id) {
    let newState = document.getElementById(`newState${id}`);
    let newReview = document.getElementById(`newReview${id}`);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        'review': newReview.value,
        'animal': {
            'state': newState.value,
        },
    });

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
    };

    fetch(apiUrl + `vet/${id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Echec de la modification');
            }

            if (response.status === 204) {
                return {};
            }

            return response.json();
        })
        .then(data => {
            if (Object.keys(data).length === 0) {
                alert('Etat modifié avec succès');
            } else {
                alert(data.message);
            }
            getAnimals();
        })
        .catch(error => console.error("Erreur: ", error.message));
}

getAnimals();