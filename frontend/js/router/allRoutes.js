import Route from "./Route.js";

export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/services", "Nos Services", "/pages/services.html"),
    new Route("/habitats", "Les Habitats", "/pages/habitats.html"),
    new Route("/contact", "Contact", "/pages/contact.html"),
    new Route("/login", "Connexion", "/pages/login.html", "../js/login.js"),
    new Route("/accounts", "Administration des comptes", "/pages/admin/accounts.html", "js/accounts.js"),
    new Route("/reviews", "Avis visiteur", "/pages/reviews.html", "js/reviews.js"),
    new Route("/reviews-adm", "Administration des avis visiteurs", "/pages/admin/reviews-adm.html", "js/reviews-adm.js")
];

export const websiteName = "Arcadia";