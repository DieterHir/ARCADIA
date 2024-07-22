import Route from "./Route.js";

export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/services", "Nos Services", "/pages/services.html"),
    new Route("/habitats", "Les Habitats", "/pages/habitats.html"),
    new Route("/contact", "Contact", "/pages/contact.html"),
    new Route("/login", "Connexion", "/pages/login.html"),
];

export const websiteName = "Arcadia";