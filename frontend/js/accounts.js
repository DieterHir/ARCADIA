let apiUrl = "http://localhost:8000/api/";

let btn_create = document.getElementById("new");
let mailNewUser = document.getElementById("email");
let passwordNewUser = document.getElementById("password");
let modalContainer = document.getElementById("modalContainer");

btn_create.addEventListener("click", newUser);

function newUser() {
    let roleInput = document.querySelector('input[name="role"]:checked');

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "email": mailNewUser.value,
        "password": passwordNewUser.value,
        "roles": [roleInput.value],
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
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
        .catch(error => console.log('error', error));

    displayUsers();
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
            let userList = document.getElementById("userList");
            userList.textContent = "";
            data.forEach(user => {
                let userdata = document.createElement("li");
                userdata.textContent = user.email;

                // let deleteButton = document.createElement("button");
                // deleteButton.textContent = "Supprimer";
                // deleteButton.classList.add("deleteButton");
                // deleteButton.id = user.id;
                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Supprimer";
                deleteButton.classList.add("btn", "btn-primary");
                deleteButton.setAttribute("data-bs-toggle", "modal");
                deleteButton.setAttribute("data-bs-target", "#" + user.id + "modal");

                let deleteModal = `
                    <div class="modal fade" id="${user.id}modal" tabindex="-1" aria-labelledby="deleteModale" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="deleteModale">Suppression d'un compte</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary deleteButton" data-bs-dismiss="modal" id="${user.id}">Confirmer la suppression</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                
                modalList.innerHTML += deleteModal;

                userdata.appendChild(deleteButton);

                userList.appendChild(userdata);
            });
            document.querySelectorAll(".deleteButton").forEach(button => {
                button.addEventListener("click", function () {
                    deleteUser(this.id)
                });
            });
        })
        .catch(error => console.error("Erreur: ", error));
}

displayUsers();

function deleteUser(id) {
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
                alert('Utilisateur n°' + `${id}` + ' supprimé avec succès.');
            } else {
                alert(data.message);
            }
            displayUsers();
        })
        .catch(error => console.error('Erreur:', error.message));
}