let apiUrl = "http://localhost:8000/habitat/";

let habitatName = document.getElementById("name");
let habitatDescription = document.getElementById("description");
let habitatImage = document.getElementById("image");

let newHabitatButton = document.getElementById("new");
newHabitatButton.addEventListener("click", addHabitat);

let habitatsContainer = document.getElementById("habitatsContainer");

let habitats = [];

function addHabitat() {
    let habitatImagePath = habitatImage.value.split("\\");

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "name": habitatName.value,
        "description": habitatDescription.value,
        "image": habitatImagePath[habitatImagePath.length - 1],
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    fetch(apiUrl + "new", requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Cet habitat a bien été créé.");
                return response.json();
            } else {
                alert("Erreur dans la création de l'habitat.");
            }
        })
        .then(data => {
            location.reload();
        })
        .catch(error => console.log('error', error));
}

function getHabitats() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(apiUrl + "getHabitats", requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(habitat => {
                habitats.push(habitat);
            });
        })
        .then(data => {
            displayHabitats(habitats);
        })
        .catch(error => console.error("Erreur: ", error));
}

function displayHabitats(habitats) {
    habitats.forEach((habitat, index) => {
        let habitatCard = document.createElement('div');
        habitatCard.classList.add('text-center', 'card-habitat', 'flex-grow-1');
        habitatCard.id = `habitat-${index}`;

        let habitatDiv = document.createElement('div');

        if (index % 2 == 0) {
            habitatDiv.classList.add('fond-secondary');
            habitatCard.innerHTML = `<h1 class="secondary h1-font">${habitat.name}</h1>
                                    <div class="d-flex justify-content-around">
                                        <img src="../images/${habitat.image}" alt="${habitat.image}"/>
                                        <p class="primary text-font align-self-center text-end">${habitat.description}</p>
                                    </div>
                                    <a href="/habitats/animalsList/${habitat.id}"><button class="button">Découvrir ses habitants</button></a>`
        } else {
            habitatDiv.classList.add('fond-primary');
            habitatCard.innerHTML = `<h1 class="secondary h1-font">${habitat.name}</h1>
                                    <div class="d-flex justify-content-around">
                                        <p class="primary text-font align-self-center text-start">${habitat.description}</p>
                                        <img src="../images/${habitat.image}" alt="${habitat.image}">
                                    </div>
                                    <a href="/habitats/animalsList/${habitat.id}"><button class="button">Découvrir ses habitants</button></a>`
        }

        let habitatButtons = document.createElement('div');
        habitatButtons.classList.add('habitatButtons', 'ms-auto');

        let deleteButton = document.createElement('button');
        deleteButton.textContent = "Supprimer";
        deleteButton.id = habitat.id;
        deleteButton.setAttribute("data-bs-toggle", "modal");
        deleteButton.setAttribute("data-bs-target", `#${habitat.id}modal`);

        let deleteModal = `
            <div class="modal fade" id="${habitat.id}modal" tabindex="-1" aria-labelledby="deleteModale" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteModale">Suppression d'un habitat</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Êtes-vous sûr de vouloir supprimer cet habitat ?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-primary btn deleteButton" data-bs-dismiss="modal" id="${habitat.id}">Confirmer la suppresion</button>
                            <button type="button" class="btn-primary btn" data-bs-dismiss="modal">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalList.innerHTML += deleteModal;

        let updateButton = document.createElement('button');
        updateButton.textContent = "Modifier";
        updateButton.id = habitat.id;
        updateButton.setAttribute("data-bs-toggle", "modal");
        updateButton.setAttribute("data-bs-target", `#${habitat.id}update`);

        let updateModal = `
            <div class="modal fade" id="${habitat.id}update" tabindex="-1" aria-labelledby="updateModale" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteModale">Modification d'un habitat</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="fond-primary primary login-form d-flex flex-column align-items-center">
                                <label for="name">Nom de l'habitat</label>
                                <input type="text" id="updatedName${habitat.id}" name="name">
                                <label for="description">Description</label>
                                <input type="text" id="updatedDescription${habitat.id}" name="description">
                                <label for="image">Image</label>
                                <input type="file" id="updatedImage${habitat.id}" name="image">
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-primary btn updateButton" data-bs-dismiss="modal" id="${habitat.id}">Confirmer les modifications</button>
                            <button type="button" class="btn-primary btn" data-bs-dismiss="modal">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalList.innerHTML += updateModal;

        habitatButtons.appendChild(updateButton);
        habitatButtons.appendChild(deleteButton);

        habitatDiv.appendChild(habitatCard);
        // habitatDiv.appendChild(habitatButtons);
        habitatDiv.classList.add('d-flex');

        habitatsContainer.appendChild(habitatDiv);
    }
    );
    document.querySelectorAll(".deleteButton").forEach(button => {
        button.addEventListener("click", function () {
            deleteHabitat(this.id);
        });
    });
    document.querySelectorAll(".updateButton").forEach(button => {
        button.addEventListener("click", function () {
            updateHabitat(this.id);
        });
    });
}

function deleteHabitat(id) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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
                alert(`Habitat n°${id} supprimé avec succès`);
            } else {
                alert(data.message);
            }
            location.reload();
        })
        .catch(error => console.error('Erreur: ', error.message));
}

function updateHabitat(id) {
    let updatedName = document.getElementById(`updatedName${id}`);
    let updatedDescription = document.getElementById(`updatedDescription${id}`);
    let updatedImage = document.getElementById(`updatedImage${id}`);

    let updatedImagePath = updatedImage.value.split("\\");

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        'name': updatedName.value,
        'description': updatedDescription.value,
        'image': updatedImagePath[updatedImagePath.length -1],
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
                alert ('Habitat modifié avec succès');
            } else {
                alert(data.message);
            }
            location.reload();
        })
        .catch(error => console.error("Erreur: ", error.message));
}

getHabitats();

console.log("hi");