let apiUrl = "http://localhost:8000/api/"

let btn_create = document.getElementById("new");
let btn_delete = document.getElementById("deleteButton");
let mailNewUser = document.getElementById("email");
let passwordNewUser = document.getElementById("password");

btn_create.addEventListener("click", newUser);
btn_delete.addEventListener("click", deleteUser);

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
                alert("Bravo, le compte associé à l'email : " + mailNewUser.value + " a bien été créé.");
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

function displayUsers() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(apiUrl + "accounts", requestOptions)
        .then(response => response.json())
        .then(data => {
            let userList = document.getElementById('userList');
            data.forEach(user => {
                let userdata = document.createElement('li');
                userdata.textContent = user.email;

                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.id = 'deleteButton';
                deleteButton.dataset.userEmail = user.email;

                userdata.appendChild(deleteButton);

                userList.appendChild(userdata);
            });
        })
        .catch(error => console.error('Erreur:', error));
}

displayUsers();

function deleteUser() {
    console.log(deleteButton.userEmail);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        'email': deleteButton.userEmail,
    });

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
    };

    fetch(apiUrl + "${email}", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Echec de la suppression');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            displayUsers();
        })
        .catch(error => console.error('Erreur:', error));
}