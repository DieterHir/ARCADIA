let apiUrl = "http://localhost:8000/contact/";

let title = document.getElementById('title');
let email = document.getElementById('email');
let message = document.getElementById('message');

let contactButton = document.getElementById('sendButton');
contactButton.addEventListener("click", sendMail);

function sendMail() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        'title': title.value,
        'email': email.value,
        'message': message.value
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw
    };

    fetch(apiUrl + 'send', requestOptions)
        .then(response => {
            if (!response.ok) {
                alert("Erreur dans l'envoi des données");
            } else {
                alert("Votre demande a bien été envoyée !");
            }
        })
}
