import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

const route404 = new Route("404", "Page introuvable", "/pages/404.html");

const getRouteByUrl = (url) => {
    let currentRoute = null;

    allRoutes.forEach((element) => {
        if (element.url == url) {
            currentRoute = element;
        }
    });

    if (currentRoute != null) {
        return currentRoute;
    } else {
        return route404;
    }
};

const LoadContentPage = async () => {

    const path = window.location.pathname;
    const actualRoute = findRoute(path);
    
    let roles = [];

    if (getRole()?.length) {
        roles = getRole().split(",")
    }

    if (actualRoute.minAuth !== "" && !roles.includes(actualRoute.minAuth)) {
        alert("Vous n'avez pas les autorisations nécessaires pour accéder à cette page.");
        window.location.pathname = "/login";
    }

    const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;

    if (actualRoute.pathJs != "") {
        let scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", actualRoute.pathJs);

        document.querySelector("body").appendChild(scriptTag);

        document.title = actualRoute.title + " - " + websiteName;
    }
};

const routeEvent = (event) => {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, event.target.href);

    LoadContentPage();
};

function findRoute(path) {
    let route = allRoutes.find(r => {
        let routeRegex = new RegExp("^" + r.url.replace(':id', '\\d+') + "$");
        //console.log(routeRegex, r, path, routeRegex.test(path));
        return routeRegex.test(path);
    });

    if (route != null) {
        return route;
    } else {
        return route404;
    }
};

// window.addEventListener("hashchange", function() {
//     let route = findRoute(path);

//     if (route) {
//         loadPage(route.page);

//         let idMatch = path.match(/animal\/(\d+)/);
//         if (idMatch) {
//             let animalId = idMatch[1];
//             loadAnimalDetails(animalId);
//         }
//     }
// });

window.onpopstate = LoadContentPage;
window.route = routeEvent;
LoadContentPage();