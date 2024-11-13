let apiUrl = "http://localhost:8000/mongoDB/";

let dashboard = document.getElementById('dashboard');

let animalsData = [];

function initializeChart() {
    function getAnimalsVisits() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            methods: 'GET',
            headers: myHeaders
        };

        fetch(apiUrl + 'getAll', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Echec de la récupération des données');
                }

                return response.json();
            })
            .then(data => {
                animalsData = data.map(animal => {
                    return { label: animal.name, y: animal.visitsCount };
                });

                chart.options.data[0].dataPoints = animalsData;

                chart.render();
            })
    }

    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Animaux avec le plus de visites"
        },
        axisY: {
            title: "Nombre de visites"
        },
        data: [{
            type: "column",
            showInLegend: false,
            dataPoints: []
        }]
    });

    getAnimalsVisits();
}

function loadCanvasJS() {
    let script = document.createElement('script');

    script.type = "text/javascript";
    script.src = 'https://cdn.canvasjs.com/canvasjs.min.js';
    document.head.appendChild(script);
    script.onload = function () {
        initializeChart();
    }
}

loadCanvasJS();