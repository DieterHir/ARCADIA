let tokenCookieName = "accesstoken";
let roleCookieName = "role";
let connected = document.querySelectorAll(".connected");
let employee = document.querySelectorAll(".employeeOnly");
let admin = document.querySelectorAll(".adminOnly");
let vet = document.querySelectorAll(".vetOnly");
let buttonAdminEmployee = document.getElementById("admin_employee");
let loginBarButton = document.getElementById("loginBarButton");

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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

function isConnected(){
    if(getToken() == null || getToken() == undefined){
        return false;
    }
    else{
        return true;
    }
}

if (isConnected()) {
    loginBarButton.innerHTML = `<a href="/login" class="nav-link">Déconnexion</a>`;
    loginBarButton.addEventListener("click", signout);
    connected.forEach(element => {
        element.classList.remove('hidden');
    });
    switch (getRole()) {
        case 'EMPLOYEE':
            buttonAdminEmployee.innerHTML = 'Employé';
            employee.forEach(element => {
                element.classList.remove('hidden');
            });
            break;
        
        case 'ADMIN':
            admin.forEach(element => {
                element.classList.remove('hidden');
            });
            break;

        case 'VET':
            vet.forEach(element => {
                element.classList.remove('hidden');
            });
            break;
    }
}