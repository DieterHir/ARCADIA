let apiUrl = "http://localhost:8000/vet/";

let reviewsContainer = document.getElementById("vetReviewsContainer");
let searchInput = document.getElementById("searchInput");
let sortInput = document.querySelectorAll('input[name="sort"]');

let reviews = [];

function getReviews() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    fetch(apiUrl + "getReviews", requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(review => {
                reviews.push(review);
            });
        })
        .then(data => {
            displayReviews(reviews);
        })
        .catch(error => console.error("Erreur: ", error));
}

function displayReviews(data) {
    let reviewData = "";

    data.forEach(element => {
        let dateLastVisit = element.date.date;
        let cleanDate = dateLastVisit.split('.')[0];

        let [datePart, timePart] = cleanDate.split(' ');
        let [year, month, day] = datePart.split('-');
        let [hours, minutes] = timePart.split(':');

        let formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;

        reviewData += `<tr class="row py-3">
                        <td class="col-3">${element.name}</td>
                        <td class="col-3">${element.review}</td>
                        <td class="col-3">${formattedDate}</td>
                        <td class="col-3">Oui</td>
                    </tr>`;
    });
    reviewsContainer.innerHTML += reviewData;
}

function handleRadioSelect(event) {
    let selectedValue = event.target.value;
    sortReviews(selectedValue);
}

sortInput.forEach(radio => {
    radio.addEventListener('change', handleRadioSelect);
})

function parseDate(dateString) {
    return new Date(dateString.date.replace(' ', 'T'));
}

function sortReviews(choice) {
    switch (choice) {
        case 'nameUp':
            reviews.sort((a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
            break;

        case 'nameDown':
            reviews.sort((a, b) => {
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            });
            break;

        case 'dateUp':
            reviews.sort((a, b) => {
                return parseDate(a.date) - parseDate(b.date);
            });
            break;

        case 'dateDown':
            reviews.sort((a, b) => {
                return parseDate(b.date) - parseDate(a.date);
            });
            break;
    }
    reviewsContainer.innerHTML = "";
    displayReviews(reviews);
}

searchInput.addEventListener("input", (e) => {
    let currentValue = e.target.value;
    
    let filteredReviews = reviews.filter(element => element.name.toLowerCase().includes(currentValue.toLowerCase()));

    reviewsContainer.innerHTML = "";
    displayReviews(filteredReviews);
})

getReviews();