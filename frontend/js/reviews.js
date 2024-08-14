let apiUrl = "http://localhost:8000/review/"

let newReviewButton = document.getElementById("newReviewButton");
let visitorName = document.getElementById("name");
let reviewMessage = document.getElementById("message");

newReviewButton.addEventListener("click", newReview);

function newReview() {
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "visitorName": visitorName.value,
        "message": reviewMessage.value,
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    fetch(apiUrl + "new", requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Bravo, votre avis a été envoyé à l'administrateur pour validation.");
                return response.json();
            } else {
                alert("Erreur dans l'envoi de votre avis.");
            }
        })
        .catch(error => console.log('error', error));
}