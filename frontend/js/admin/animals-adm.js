let apiUrl = "http://localhost:8000/animal/";

let newAnimalButton = document.getElementById("new");
newAnimalButton.addEventListener("click", addAnimal);

let animalsContainer = document.getElementById("animalsContainer");

let animalName = document.getElementById("name");
let animalSpecies = document.getElementById("species");
let animalImage = document.getElementById("image");
let animalHabitat = document.getElementById("habitat");
let animalAge = document.getElementById("age");
let animalSize = document.getElementById("size");
let animalWeight = document.getElementById("weight");

let animals = [];

function populateHabitatSelect(selectId) {
    fetch("http://localhost:8000/habitat/getHabitats")
        .then(response => response.json())
        .then(data => {
            let selectElement = document.getElementById(selectId);
            data.forEach(habitat => {
                let habitatOption = document.createElement('option');
                habitatOption.value = habitat.id;
                habitatOption.textContent = habitat.name;
                selectElement.appendChild(habitatOption);
            });
        })
        .catch(error => console.error('Erreur fetch :', error));
}

function addAnimal() {
    let animalImagePath = animalImage.value.split("\\");

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let raw = JSON.stringify({
        "name": animalName.value,
        "species": animalSpecies.value,
        "image": animalImagePath[animalImagePath.length - 1],
        "age": parseInt(animalAge.value, 10),
        "size": parseInt(animalSize.value, 10),
        "weight": parseInt(animalWeight.value, 10),
        "habitat": parseInt(habitatSelect.value, 10),
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    fetch(apiUrl + "new", requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Cet animal a bien été ajouté.");
                return response.json();
            } else {
                alert("Erreur lors de l'ajout de l'animal.");
            }
        })
        .then(data => {
            location.reload();
        })
        .catch(error => console.log('error', error));
}

function getAnimals() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: "GET",
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
    let animalsContainer = document.getElementById('animalsContainer');
    let row;

    animals.forEach((animal, index) => {

        if (index % 3 === 0) {
            row = document.createElement('div');
            row.classList.add('row', 'mb-2');
            animalsContainer.append(row);
        }

        let animalCard = document.createElement('div');
        animalCard.classList.add('col-md-4', 'd-flex', 'align-items-center', 'flex-column');
        animalCard.id = `animal-${index}`;

        animalCard.innerHTML = `<div class="miniaAnimalCard position-relative d-flex flex-column align-items-center">
                                    <img src="../images/${animal.image}" alt="${animal.image}"/>
                                    <div class="overlay">
                                        <h2 class="secondary h2-font">${animal.name}</h2>
                                        <h3 class="primary text-font">${animal.species}</h3>
                                        <a href="/animal/${animal.id}"><button class="button">Voir la fiche</button></a>
                                    </div>
                                </div>`;

        let animalButtons = document.createElement('div');
        animalButtons.classList.add('animalButtons');

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('button', 'bg-danger');
        deleteButton.textContent = "Supprimer";
        deleteButton.id = animal.id;
        deleteButton.setAttribute("data-bs-toggle", "modal");
        deleteButton.setAttribute("data-bs-target", `#${animal.id}modal`);

        let deleteModal = `
            <div class="modal fade" id="${animal.id}modal" tabindex="-1" aria-labelledby="deleteModale" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteModale">Suppression d'un animal</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Êtes-vous sûr de vouloir supprimer cet animal ?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-primary btn deleteButton" data-bs-dismiss="modal" id="${animal.id}">Confirmer la suppresion</button>
                            <button type="button" class="btn-primary btn" data-bs-dismiss="modal">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalList.innerHTML += deleteModal;

        let updateButton = document.createElement('button');
        updateButton.classList.add('button', 'bg-success');
        updateButton.textContent = "Modifier";
        updateButton.id = animal.id;
        updateButton.setAttribute("data-bs-toggle", "modal");
        updateButton.setAttribute("data-bs-target", `#${animal.id}update`);

        let updateModal = `
            <div class="modal fade" id="${animal.id}update" tabindex="-1" aria-labelledby="updateModale" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteModale">Modification d'un animal</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="fond-primary primary login-form d-flex flex-column align-items-center">
                                <label for="name">Nom de l'animal</label>
                                <input type="text" id="updatedName${animal.id}" name="name">
                                <label for="species">Race</label>
                                <input type="text" id="updatedSpecies${animal.id}" name="species">
                                <label for="age">Age</label>
                                <input type="number" id="updatedAge${animal.id}" name="age">
                                <label for="size">Taille</label>
                                <input type="size" id="updatedSize${animal.id}" name="size">
                                <label for="weight">Poids</label>
                                <input type="weight" id="updatedWeight${animal.id}" name="weight">
                                <label for="image">Image</label>
                                <input type="file" id="updatedImage${animal.id}" name="image">
                                <label for="habitat" id="updatedHabitat${animal.id}" name="habitat">
                                <select class="form-select" id="updateHabitatSelect${animal.id}" aria-label="habitat select">
                                    <Option select>Selectionnez un habitat</Option>
                                </select>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-primary btn updateButton" data-bs-dismiss="modal" id="${animal.id}">Confirmer les modifications</button>
                            <button type="button" class="btn-primary btn" data-bs-dismiss="modal">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalList.innerHTML += updateModal;

        animalButtons.append(updateButton);
        animalButtons.append(deleteButton);
        animalButtons.classList.add('mt-2');

        animalCard.append(animalButtons);

        if (index < animals.length - 2) {
            animalCard.innerHTML += '<hr class="secondary align-self-center"/>'
        }

        row.append(animalCard);
        populateHabitatSelect(`updateHabitatSelect${animal.id}`);
    });

    document.querySelectorAll(".deleteButton").forEach(button => {
        button.addEventListener("click", function() {
            deleteAnimal(this.id);
        });
    });

    document.querySelectorAll(".updateButton").forEach(button => {
        button.addEventListener("click", function() {
            updateAnimal(this.id);
        });
    });
}


function deleteAnimal(id) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };

    fetch(apiUrl + `${id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Echec de la suppression');
            }

            if (response.status === 204) {
                return {};
            }

            return response.json();
        })
        .then(data => {
            if (Object.keys(data).length === 0) {
                alert(`Animal n°${id} supprimé avec succès`);
            } else {
                alert(data.message);
            }
            location.reload();
        })
        .catch(error => console.error('Erreur: ', error.message));
}

function updateAnimal(id) {
    let updatedName = document.getElementById(`updatedName${id}`);
    let updatedSpecies = document.getElementById(`updatedSpecies${id}`);
    let updatedAge = document.getElementById(`updatedAge${id}`);
    let updatedSize = document.getElementById(`updatedSize${id}`);
    let updatedWeight = document.getElementById(`updatedWeight${id}`);
    let updatedImage = document.getElementById(`updatedImage${id}`);
    let habitatSelect = document.getElementById(`updateHabitatSelect${id}`);

    let updatedImagePath = updatedImage.value.split("\\");

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let raw = JSON.stringify({
        'name': updatedName.value,
        'species': updatedSpecies.value,
        'age': parseInt(updatedAge.value, 10),
        'size': parseInt(updatedSize.value, 10),
        'weight': parseInt(updatedWeight.value, 10),
        'image': updatedImagePath[updatedImagePath.length -1],
        'habitat': parseInt(habitatSelect.value, 10)
    });

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
    };

    fetch(apiUrl + `${id}`, requestOptions)
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
                alert ('Animal modifié avec succès');
            } else {
                alert(data.message);
            }
            location.reload();
        })
        .catch(error => console.error("Erreur: ", error.message));
}

populateHabitatSelect(`habitatSelect`);
getAnimals();