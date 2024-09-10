import Route from "./Route.js";

export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", "/js/home.js"),
    new Route("/services", "Nos Services", "/pages/services.html"),
    new Route("/habitats", "Les Habitats", "/pages/habitats.html"),
    new Route("/contact", "Contact", "/pages/contact.html"),
    new Route("/login", "Connexion", "/pages/login.html", "../js/login.js"),
    new Route("/accounts", "Administration des comptes", "/pages/admin/accounts.html", "js/admin/accounts.js"),
    new Route("/reviews", "Avis visiteur", "/pages/reviews.html", "js/reviews.js"),
    new Route("/reviews-adm", "Administration des avis visiteurs", "/pages/admin/reviews-adm.html", "js/admin/reviews-adm.js"),
    new Route("/habitats", "Nos Habitats", "/pages/habitats.html", "../js/habitats.js"),
    new Route("/animals-adm", "Administration des animaux", "/pages/admin/animals-adm.html", "js/admin/animals-adm.js"),
    new Route("/animal/:id", "Fiche détaillée", "/pages/animal.html", "/js/animal.js"),
    new Route("/vet-adm", "Administration des avis vétérinaire", "/pages/vet/vet-adm.html", "/js/vet/vet-adm.js"),
];

export const websiteName = "Arcadia";