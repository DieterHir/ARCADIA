let apiUrl = "http://localhost:8000/habitat/";

let path = window.location.pathname;
let id = path.split('/').pop();

let animalsContainer = document.getElementById("animalsContainer");

let animals = [];

function getAnimalsList(id) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    fetch(apiUrl + `${id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(animal => {
                animals.push(animal)
            });
        })
        .then(data => {
            displayAnimalsList(animals);
        })
        .catch(error => console.error("Erreur : ", error));
}

function displayAnimalsList(animals) {
    let row;

    if (animals.length === 0) {;
        animalsContainer.classList.add('p-5');
        animalsContainer.innerHTML = "Désolé, nous n'avons pas trouvé d'animaux pour cet habitat.";
    }

    animals.forEach((animal, index) => {
        if (index % 3 === 0) {
            row = document.createElement('div');
            row.classList.add('row', 'py-2', 'd-flex', 'flex-row', 'justify-content-around');
            animalsContainer.append(row);
        }

        let animalCard = document.createElement('div');
        animalCard.classList.add('col-md-4', 'd-flex', 'align-items-center', 'flex-column');
        animalCard.id = `animal-${index}`;

        animalCard.innerHTML = `<div class="miniaAnimalCard position-relative d-flex flex-column align-items-center">
                                    <img src="/images/${animal.image}" alt="${animal.image}"/>
                                    <div class="overlay">
                                        <h2 class="secondary h2-font">${animal.name}</h2>
                                        <h3 class="primary text-font">${animal.species}</h3>
                                        <a href="/animal/${animal.id}"><button class="button">Voir la fiche</button></a>
                                    </div>
                                </div>`;

        row.append(animalCard);
    });
}

getAnimalsList(id);