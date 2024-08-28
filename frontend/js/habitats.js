let apiUrl = "http://localhost:8000/habitat/"

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
        habitatCard.classList.add('text-center');
        habitatCard.classList.add('card-habitat');
        habitatCard.classList.add('flex-grow-1');
        habitatCard.id = `habitat-${index}`;

        let habitatDiv = document.createElement('div');

        if (index % 2 == 0) {
            habitatDiv.classList.add('fond-secondary');
            habitatCard.innerHTML = `<h1 class="secondary h1-font">${habitat.name}</h1>
                                    <div class="d-flex justify-content-around">
                                        <img src="../images/${habitat.image}" alt="${habitat.image}"/>
                                        <p class="primary text-font align-self-center text-end">${habitat.description}</p>
                                    </div>
                                    <button class="button">Découvrir ses habitants</button>`
        } else {
            habitatDiv.classList.add('fond-primary');
            habitatCard.innerHTML = `<h1 class="secondary h1-font">${habitat.name}</h1>
                                    <div class="d-flex justify-content-around">
                                        <p class="primary text-font align-self-center text-start">${habitat.description}</p>
                                        <img src="../images/${habitat.image}" alt="${habitat.image}">
                                    </div>
                                    <button class="button">Découvrir ses habitants</button>`
        }

        let habitatButtons = document.createElement('div');
        habitatButtons.classList.add('habitatButtons');
        habitatButtons.classList.add('ms-auto');

        let deleteButton = document.createElement('button');
        deleteButton.textContent = "Supprimer";
        deleteButton.classList.add('deleteButton');
        deleteButton.id = habitat.id;

        let updateButton = document.createElement('button');
        updateButton.textContent = "Modifier";
        updateButton.classList.add('updateButton');
        updateButton.id = habitat.id;

        habitatButtons.appendChild(updateButton);
        habitatButtons.appendChild(deleteButton);

        habitatDiv.appendChild(habitatCard);
        habitatDiv.appendChild(habitatButtons);
        habitatDiv.classList.add('d-flex');

        habitatsContainer.appendChild(habitatDiv);
    }
    );
    document.querySelectorAll(".deleteButton").forEach(button => {
        button.addEventListener("click", function() {
            deleteHabitat(this.id);
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

}

getHabitats();