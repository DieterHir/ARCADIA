let apiUrl = "http://localhost:8000/api/"

let btn_create = document.getElementById("new");
let mailNewUser = document.getElementById("email");
let passwordNewUser = document.getElementById("password");

btn_create.addEventListener("click", newUser);

function newUser() {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "email": mailNewUser.value,
        "password": passwordNewUser.value,
        "role": "employee",
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch(apiUrl + "registration", requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Bravo, le compte associé à l'email : "+mailNewUser.value+" a bien été créé.");
                return response.json();
            } else { 
                alert("Erreur dans la création du compte");
            }
        })
        // .then(result => {
        //     alert("Bravo, le compte associé à l'email : "+mailNewUser.value+" a bien été créé.");
        // })
        .catch(error => console.log('error', error));
}