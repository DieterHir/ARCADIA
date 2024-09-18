let apiUrl = "http://localhost:8000/api/"

let btn_login = document.getElementById("btn_login");
let email = document.getElementById("login");
let password = document.getElementById("password");

btn_login.addEventListener("click", login);

function login() {

    console.log(password.value)

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("X-AUTH-TOKEN", getToken());
    // myHeaders.append("Acces-Control-Allow-Origin", "*");

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