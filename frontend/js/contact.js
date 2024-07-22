let contactButton = document.getElementById("contact-button");
contactButton.addEventListener("click", sendMail);

function sendMail() {
    Email.send({
        SecureToken : "6064d0e2-de4e-4508-a8fc-8acfa950c5f2",
        To : "dieterhiroux@gmail.com",
        From : "dieterhiroux@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
        message => alert(message)
    );
}