let apiUrl = "http://localhost:8000/api/"

let btn_login = document.getElementById("btn_login");
let email = document.getElementById("login");
let password = document.getElementById("password");

btn_login.addEventListener("click", login);

email.addEventListener("input", function(event) {
    let mail = event.target.value;
    let isValid = validateEmail(mail);

    if (!isValid) {
        email.classList.add("is-invalid");
        btn_login.classList.add("disabled");
        btn_login.disabled = true;
    } else {
        email.classList.remove("is-invalid");
        btn_login.classList.remove("disabled");
        btn_login.disabled = false;
    }
});

function sanitize(string) {
    let map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };

    let reg = /[&<>"'/`]/ig;
    return string.replace(reg, (match) =>(map[match]));
}

function login() {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
        "username" : sanitize(email.value),
        "password" : sanitize(password.value),
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
                return response.json();
            } else {
                email.classList.add("is-invalid");
                password.classList.add("is-invalid");
            }
        })
        .then(result => {
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