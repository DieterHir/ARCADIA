import Route from "./Route.js";

export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", "/js/home.js", ""),
    new Route("/services", "Nos Services", "/pages/services.html", "/js/services.js", ""),
    new Route("/habitats", "Les Habitats", "/pages/habitats.html", "/js/habitats.js", ""),
    new Route("/contact", "Contact", "/pages/contact.html", "/js/contact.js"),
    new Route("/login", "Connexion", "/pages/login.html", "/js/login.js", ""),
    new Route("/accounts", "Administration des comptes", "/pages/admin/accounts.html", "/js/admin/accounts.js", "ROLE_ADMIN"),
    new Route("/reviews", "Avis visiteur", "/pages/reviews.html", "/js/reviews.js", ""),
    new Route("/reviews-adm", "Administration des avis visiteurs", "/pages/admin/reviews-adm.html", "/js/admin/reviews-adm.js", "ROLE_EMPLOYEE"),
    new Route("/animals-adm", "Administration des animaux", "/pages/admin/animals-adm.html", "/js/admin/animals-adm.js", "ROLE_ADMIN"),
    new Route("/animal/:id", "Fiche détaillée", "/pages/animal.html", "/js/animal.js", ""),
    new Route("/vet-adm", "Administration des avis vétérinaire", "/pages/vet/vet-adm.html", "/js/vet/vet-adm.js", "ROLE_VET"),
    new Route("/habitats/animalsList/:id", "Liste des habitants de l'habitat :id", "/pages/animalsList.html", "/js/animalsList.js", ""),
    new Route("/vetReviews-adm", "Récapitulatif des avis vétérinaires", "/pages/admin/vetReviews-adm.html", "/js/admin/vetReviews-adm.js", "ROLE_ADMIN"),
];

export const websiteName = "Arcadia";