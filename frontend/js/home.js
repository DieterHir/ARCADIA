let apiUrl = "http://localhost:8000/review/";

let reviewCommentary = document.getElementById("commentary");
let reviewVisitor = document.getElementById("visitor");
let reviewDate = document.getElementById("reviewDate");

let buttonPreviousReview = document.getElementById("previousReview");
buttonPreviousReview.addEventListener("click", previousReview);
let buttonNextReview = document.getElementById("nextReview");
buttonNextReview.addEventListener("click", nextReview);

let reviews = [];

function getReviews() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(apiUrl + "displayReviews", requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(review => {
                if (review.state === "checked") {
                    reviews.push(review);
                }
            });
        })
        .then(data => {
            displayReviews();
        })
        .catch(error => console.error("Erreur: ", error));
}

function displayReviews(number) {
    if (number === "" || number === undefined) {
        reviewCommentary.textContent = `« ${reviews[0].message} »`;
        reviewVisitor.textContent = reviews[0].visitor_name;
        reviewDate.textContent = new Date(reviews[0].createdAt.date).toLocaleDateString();
        reviewCommentary.data_id = 0;
    } else {

        reviewCommentary.textContent = reviews[number].message;
        reviewVisitor.textContent = reviews[number].visitor_name;
        reviewDate.textContent = new Date(reviews[number].createdAt.date).toLocaleDateString();
        reviewCommentary.data_id = number;
    }
}

function previousReview() {
    let currentReview = reviewCommentary.data_id;

    if (currentReview > 0) {
        currentReview -= 1;
    } else {
        currentReview = 0;
    }

    displayReviews(currentReview);
}

function nextReview() {
    let currentReview = reviewCommentary.data_id;

    if (currentReview < reviews.length) {
        currentReview += 1;
    } else {
        currentReview = 0;
    }

    displayReviews(currentReview);
}

window.addEventListener("DOMContentLoaded", getReviews());