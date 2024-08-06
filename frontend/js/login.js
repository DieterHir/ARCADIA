let apiUrl = "http://localhost:8000/api/"

let btn_login = document.getElementById("btn_login");
let email = document.getElementById("login");
let password = document.getElementById("password");

btn_login.addEventListener('click', login());

function login() {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "email" : email.value,
        "password" : password.value,
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(apiUrl+"login", requestOptions)
        .then(response => {
            if (response.ok) {
                alert('Connexion réussie');
                return response.json();
            } else {
                alert('Connexion échouée, vérifiez vos identifiants')
            }
        })
        .catch(error => console.log('error', error))
}