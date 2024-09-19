let apiUrl = "http://localhost:8000/services/";

let newServiceButton = document.getElementById("new");
newServiceButton.addEventListener("click", addService);

let servicesContainer = document.getElementById("servicesContainer");

let serviceName = document.getElementById("name");
let serviceDescription = document.getElementById("description");
let serviceImage = document.getElementById("image");

let serviceModalList = document.getElementById("serviceModalList");

let services = [];

function addService() {
    let serviceImagePath = serviceImage.value.split("\\");

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let raw = JSON.stringify({
        "name": serviceName.value,
        "description": serviceDescription.value,
        "image": serviceImagePath[serviceImagePath.length - 1],
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    fetch(apiUrl + "new", requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Ce service a bien été ajouté.");
                return response.json();
            } else {
                alert("Erreur lors de l'ajout du service.");
            }
        })
        .then(data => {
            getServices();
        })
        .catch(error => console.log('error', error));
}

function getServices() {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    fetch(apiUrl + "getServices", requestOptions)
        .then(response => response.json())
        .then(data => {
            services = [];
            data.forEach(service => {
                services.push(service);
            });
        })
        .then(data => {
            displayServices(services);
        })
        .catch(error => console.error("Erreur: ", error));
}

function displayServices(services) {
    servicesContainer.innerHTML = "";

    services.forEach((service, index) => {
        let serviceDiv = document.createElement('div');

        let serviceCard = document.createElement('div');
        serviceCard.classList.add('text-center', 'flex-grow-1');

        if (index % 2 === 0) {
            serviceDiv.classList.add('fond-secondary', 'pb-5');

            serviceCard.innerHTML = `   <h1 class="secondary py-4 h1-font px-3">${service.name}</h1>
                                        <div class="d-flex justify-content-around">
                                            <img class="rounded" src="../images/${service.image}" alt=""/>
                                            <p class="primary text-font pt-4 px-4 align-self-center text-end">${service.description}</p>
                                        </div>`;
        } else {
            serviceDiv.classList.add('fond-primary', 'pb-5');

            serviceCard.innerHTML = `   <h1 class="secondary py-4 h1-font px-3">${service.name}</h1>
                                        <div class="d-flex justify-content-around">
                                            <p class="primary text-font pt-4 px-4 text-start align-self-center">${service.description}</p>
                                            <img class="rounded" src="../images/${service.image}" alt=""/>
                                        </div>`;
        }

        let serviceButtons = document.createElement('div');
        serviceButtons.classList.add('servicesButtons', 'ms-auto');
        serviceButtons.setAttribute("data-show", "EMPLOYEE");

        let deleteButton = document.createElement('button');
        deleteButton.textContent = "Supprimer";
        deleteButton.id = service.id;
        deleteButton.setAttribute("data-bs-toggle", "modal");
        deleteButton.setAttribute("data-bs-target", `#${service.id}modal`);

        let deleteModal = `
            <div class="modal fade" id="${service.id}modal" tabindex="-1" aria-labelledby="deleteModale" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="deleteModale">Suppression d'un service</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Êtes-vous sûr de vouloir supprimer ce service ?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-primary btn deleteButton" data-bs-dismiss="modal" id="${service.id}">Confirmer la suppresion</button>
                            <button type="button" class="btn-primary btn" data-bs-dismiss="modal">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        serviceModalList.innerHTML += deleteModal;

        let updateButton = document.createElement('button');
        updateButton.textContent = "Modifier";
        updateButton.id = service.id;
        updateButton.setAttribute("data-bs-toggle", "modal");
        updateButton.setAttribute("data-bs-target", `#${service.id}update`);

        let updateModal = `
            <div class="modal fade" id="${service.id}update" tabindex="-1" aria-labelledby="updateModale" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="updateModale">Modification d'un service</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="fond-primary primary login-form d-flex flex-column align-items-center">
                                <label for="name">Nom du service</label>
                                <input type="text" id="updatedName${service.id}" name="name">
                                <label for="description">Description</label>
                                <input type="text" id="updatedDescription${service.id}" name="description">
                                <label for="image">Image</label>
                                <input type="file" id="updatedImage${service.id}" name="image">
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-primary btn updateButton" data-bs-dismiss="modal" id="${service.id}">Confirmer les modifications</button>
                            <button type="button" class="btn-primary btn" data-bs-dismiss="modal">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        serviceModalList.innerHTML += updateModal;

        serviceButtons.appendChild(updateButton);
        serviceButtons.appendChild(deleteButton);

        serviceDiv.appendChild(serviceCard);
        serviceDiv.appendChild(serviceButtons);
        serviceDiv.classList.add('d-flex');

        servicesContainer.append(serviceDiv); 
    });
    document.querySelectorAll(".deleteButton").forEach(button => {
        button.addEventListener("click", function () {
            deleteService(this.id);
        });
    });
    document.querySelectorAll(".updateButton").forEach(button => {
        button.addEventListener("click", function () {
            updateService(this.id);
        });
    });
}

function deleteService(id) {
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
                alert(`Service n°${id} supprimé avec succès`);
            } else {
                alert(data.message);
            }
            getServices();
        })
        .catch(error => console.error('Erreur: ', error.message));
}

function updateService(id) {
    let updatedName = document.getElementById(`updatedName${id}`);
    let updatedDescription = document.getElementById(`updatedDescription${id}`);
    let updatedImage = document.getElementById(`updatedImage${id}`);

    let updatedImagePath = updatedImage.value.split("\\");

    if (updatedName.value === "") {
        updatedName = "";
    }
    if (updatedDescription.value === "") {
        updatedDescription = "";
    }
    if (updatedImage.value === "") {
        updatedImagePath = "";
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

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
                alert ('Service modifié avec succès');
            } else {
                alert(data.message);
            }
            getServices();
        })
        .catch(error => console.error("Erreur: ", error.message));
}

getServices();