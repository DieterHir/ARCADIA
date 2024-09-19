USE arcadia;

DELETE FROM habitat WHERE id > 0;
ALTER TABLE habitat AUTO_INCREMENT=0;
INSERT INTO habitat (name, image, description)
VALUES
('Desert', 'desert.jpg', 'Les grandes étendues arides contiennent elles aussi de nombreuses espèces !'),
('Rivière', 'riviere.jpg', "Venez découvrir les habitants de nos cours d\'eaux"),
('Forêt', 'foret.jpg', 'Entre les arbres des forêts denses, se cachent beaucoup de petits, ou grosses bêtes..');

DELETE FROM animal WHERE id > 0;
ALTER TABLE animal AUTO_INCREMENT=0;
INSERT INTO animal (name, species, age, size, weight, image, habitat_id, state)
VALUES
('Juju', 'Loutre brune', 3, 65, 7, 'loutre.jpg', 2, 'Bon'),
('Coco', 'Perroquet', 2, 20, 0.2, 'perroquet.jpg', 3, 'Bon'),
('Pio', 'Scorpion', 1, 10, 0.005, 'scorpion.jpg', 1, 'Bon'),
('Jammy', 'Flamant rose', 2, 145, 4, 'flamant.jpg', 2, 'Bon'),
('Summer et Spring', 'Loup gris', 2, 120, 60, 'loups.jpg', 3, 'Bon');

DELETE FROM vet_reviews WHERE id > 0;
ALTER TABLE vet_reviews AUTO_INCREMENT=0;
INSERT INTO vet_reviews (date, review, animal_id)
VALUES
(NOW(), "Manque d\'énergie, à surveiller", 1),
(NOW(), "Etat général bon, surveiller le poids", 2),
(NOW(), "OK", 3),
(NOW(), "A surveiller", 4);

DELETE FROM review WHERE id > 0;
ALTER TABLE review AUTO_INCREMENT=0;
INSERT INTO review (visitor_name, message, created_at, state)
VALUES
('Didi', 'Très bonne journée dans votre parc, je recommande pour petits et grands !', NOW(), 'checked'),
('Anonyme23', "L\'état de certains enclos laisse à désirer !", NOW(), 'toCheck'),
('Patou', "J\'ai adoré ! Merci pour ces belles découvertes !", NOW(), 'toCheck');

DELETE FROM services WHERE id > 0;
ALTER TABLE services AUTO_INCREMENT=0;
INSERT INTO services (name, description, image)
VALUES
('Restauration', 'Venez découvrir nos cartes variées pour toute la famille !', 'restaurant.jpg'),
('Visite en petit train', "Vous avez mal aux pieds à force d\'arpenter nos habitats ? Pourquoi ne pas vous laisser emporter par notre visite gratuite en petit train ?", 'train.jpg'),
('Visite guidée', "Notre parc vous propose les services de plusieurs guides pour vous donner un accompagnement personnalisé et répondre à toutes vos questions lors de votre visite ! (tarif selon groupe et saison)", 'guide.jpg');
