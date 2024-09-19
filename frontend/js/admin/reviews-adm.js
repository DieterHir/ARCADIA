let apiUrl = "http://localhost:8000/review/";

let reviewsToCheck = document.getElementById("reviewsToCheck");
let reviewsChecked = document.getElementById("reviewsChecked");

function displayReviews() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(apiUrl + "displayReviews", requestOptions)
        .then(response => response.json())
        .then(data => {
            reviewsToCheck.textContent = "";
            reviewsChecked.textContent = "";
            data.forEach(review => {
                console.log(review.state)
                if (review.state === "toCheck") {
                    let reviewdata = document.createElement("li");
                    reviewdata.textContent = review.message + " | " + review.visitor_name + " | " + review.created_at;

                    let checkButton = document.createElement("button");
                    checkButton.textContent = "Valider";
                    checkButton.classList.add("checkButton");
                    checkButton.id = review.id;

                    let deleteButton = document.createElement("button");
                    deleteButton.textContent = "Supprimer";
                    deleteButton.classList.add("deleteButton");
                    deleteButton.id = review.id;

                    reviewdata.appendChild(checkButton);
                    reviewdata.appendChild(deleteButton);

                    reviewsToCheck.appendChild(reviewdata);
                } else {
                    let reviewdata = document.createElement("li");
                    reviewdata.textContent = review.message + " | " + review.visitor_name + " | " + review.created_at;

                    let deleteButton = document.createElement("button");
                    deleteButton.textContent = "Supprimer";
                    deleteButton.classList.add("deleteButton");
                    deleteButton.id = review.id;

                    reviewdata.appendChild(deleteButton);

                    reviewsChecked.appendChild(reviewdata);
                };
            });
            document.querySelectorAll(".deleteButton").forEach(button => {
                button.addEventListener("click", function() {
                    deleteReview(this.id);
                });
            });
            document.querySelectorAll(".checkButton").forEach(button => {
                button.addEventListener("click", function() {
                    checkReview(this.id);
                })
            })
        })
        .catch(error => console.error("Erreur: ", error));
}

function deleteReview(id) {
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
                alert('Avis n°'+`${id}`+' supprimé avec succès');
            } else {
                alert(data.message);
            }
            displayReviews();
        })
        .catch(error => console.error('Erreur: ', error.message));
}

function checkReview(id) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
    };

    fetch(apiUrl + `${id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Echec de la validation');
            }

            if (response.status === 204) {
                return {};
            }

            return response.json();
        })
        .then(data => {
            if (Object.keys(data).length === 0) {
                alert('Avis n°'+`${id}`+' validé avec succès');
            } else {
                alert(data.message);
            }
            displayReviews();
        })
        .catch(error => console.error('Erreur: ', error.message));
}

displayReviews();