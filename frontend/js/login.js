let apiUrl = "http://localhost:8000/api/"

let btn_login = document.getElementById("btn_login");
let email = document.getElementById("login");
let password = document.getElementById("password");

btn_login.addEventListener("click", login);

function login() {

    if (!validateEmail(email.value)) {
        email.classList.add("is-invalid");
        return;
    } else {
        email.classList.remove("is-invalid");
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
        "username" : email.value,
        "password" : password.value,
    });

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        // mode: 'no-cors',
        body: raw,
        redirect: 'follow'
    };

    fetch(apiUrl+"login", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                email.classList.add("is-invalid");
                password.classList.add("is-invalid");
            }
        })
        .then(result => {
            console.log(result);
            let token = result.apiToken;
            setToken(token);

            setCookie(roleCookieName, result.roles, 7);
            window.location.replace("/");
        })
        .catch(error => console.log('error', error));
}

function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}