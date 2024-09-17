let tokenCookieName = "accesstoken";
let roleCookieName = "role";
let connected = document.querySelectorAll(".connected");
let buttonAdminEmployee = document.getElementById("admin_employee");
let loginBarButton = document.getElementById("loginBarButton");
let signOutButton = document.getElementById("signOutBtn");

signOutButton.addEventListener("click", signout);

let schedulesApiUrl = "http://localhost:8000/schedules/";

let openingDays = document.getElementById("openingDays");
let openingTime = document.getElementById("openingTime");
let closingTime = document.getElementById("closingTime");
let schedules = document.getElementById("schedules");
let modalList = document.getElementById("modalList");

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getRole() {
    return getCookie(roleCookieName);
}

function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);
    window.location.reload();
}

function setToken(token) {
    setCookie(tokenCookieName, token, 7);
}

function getToken() {
    return getCookie(tokenCookieName);
}

function isConnected() {
    return getToken() != null && getToken() != undefined;
}

function getSchedules() {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    fetch(schedulesApiUrl + "getSchedules", requestOptions)
        .then(response => response.json())
        .then(data => {
            openingDays.innerHTML = data.openingDays;
            openingTime.innerHTML = data.openingTime;
            closingTime.innerHTML = data.closingTime;

            let schedulesUpdateButton = document.createElement('button');
            schedulesUpdateButton.classList.add('button');
            schedulesUpdateButton.dataset.show = 'ADMIN';
            schedulesUpdateButton.textContent = "Modifier les horaires";
            schedulesUpdateButton.id = data.id;
            schedulesUpdateButton.setAttribute("data-bs-toggle", "modal");
            schedulesUpdateButton.setAttribute("data-bs-target", `#${data.id}update`);
            let updateModal = `
            <div class="modal fade" id="${data.id}update" tabindex="-1" aria-labelledby="updateModale" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="updateModale">Modification d'un service</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="fond-primary primary login-form d-flex flex-column align-items-center">
                                <label for="days">Jours d'ouverture</label>
                                <input type="text" id="updatedDays${data.id}" name="days">
                                <label for="openingTime">Heure d'ouverture</label>
                                <input type="text" id="updatedOpeningTime${data.id}" name="openingTime">
                                <label for="closingTime">Heure de fermeture</label>
                                <input type="text" id="updatedClosingTime${data.id}" name="closingTime">
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-primary btn updateButtonSchedule" data-bs-dismiss="modal" id="${data.id}">Confirmer les modifications</button>
                            <button type="button" class="btn-primary btn" data-bs-dismiss="modal">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
            schedules.appendChild(schedulesUpdateButton);
            modalList.innerHTML = updateModal;
        })
        .then(data => {
            document.querySelectorAll(".updateButtonSchedule").forEach(button => {
                button.addEventListener("click", function () {
                    console.log(this);
                    updateSchedules(this.id);
                });
            });

        })
        .catch(error => console.error("Erreur: ", error));
}

function updateSchedules(id) {
    let updatedDays = document.getElementById(`updatedDays${id}`);
    let updatedOpeningTime = document.getElementById(`updatedOpeningTime${id}`);
    let updatedClosingTime = document.getElementById(`updatedClosingTime${id}`);

    if (updatedDays.value === "") {
        updatedDays = "";
    }
    if (updatedOpeningTime.value === "") {
        updatedOpeningTime = "";
    }
    if (updatedClosingTime.value === "") {
        updatedClosingTime = "";
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let raw = JSON.stringify({
        'days': updatedDays.value,
        'openingTime': updatedOpeningTime.value,
        'closingTime': updatedClosingTime.value,
    });

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
    };

    fetch(schedulesApiUrl + `${id}`, requestOptions)
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
                alert('Horaires modifiés avec succès');
            } else {
                alert(data.message);
            }
            getSchedules();
        })
        .catch(error => console.error("Erreur: ", error.message));
}

getSchedules();

function showAndHideElementsForRoles() {
    let userConnected = isConnected();

    let roles = []

    if (getRole()?.length) {
        roles = getRole().split(",");
    }

    // if (userConnected) {
    //     loginBarButton.innerHTML = `<a href="/login" class="nav-link">Déconnexion</a>`;
    //     loginBarButton.addEventListener("click", signout);
    // }

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element => {
        switch (element.dataset.show) {
            case 'DISCONNECTED':
                if (userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'CONNECTED':
                if (!userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'EMPLOYEE':
                if (!userConnected || roles.includes("VET")) {
                    element.classList.add("d-none");
                }
                break;
            case 'VET':
                if (!userConnected || !roles.includes("VET")) {
                    element.classList.add("d-none");
                }
                break;
            case 'ADMIN':
                if (!userConnected || !roles.includes("ADMIN")) {
                    element.classList.add("d-none");
                }
                break;
        }
    })
}

let observer = new MutationObserver(() => {
    showAndHideElementsForRoles();
})

observer.observe(document.querySelector("body"), {
    attributeFilter: ["data-show"],
    subtree: true,
    childList: true,
})