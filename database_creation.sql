CREATE DATABASE IF NOT EXISTS arcadia;

USE arcadia;

CREATE TABLE users
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    roles JSON NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME,
    api_token VARCHAR(255)
);

INSERT INTO users (email, roles, password, created_at, api_token) VALUES ('admin@mail.com', '["ROLE_ADMIN","ROLE_EMPLOYEE"]', '$2y$13$kI94CpbjQrf4zKxLeB2hyuM0EQfLSudxri2hPsEBITQ8L2JmLGh9m', NOW(), '3d0b70645e24bd7d32cdbb8ca37c538448b6d035');
INSERT INTO users (email, roles, password, created_at, api_token) VALUES ('employee@mail.com', '["ROLE_EMPLOYEE"]', '$2y$13$jP33.IaSOPt8WcZgXsxi0ejIDJH3WIg3Cv8cU3cB0aeKcpkd.S8xK', NOW(), 'b915211215d420ef14931d02b45b276e606a31fc');
INSERT INTO users (email, roles, password, created_at, api_token) VALUES ('vet@mail.com', '["ROLE_VET"]', '$2y$13$C1oeBLmg3DKSjqBgBsTNpOdijYLunEtPHt3yI1xLRTySfOANuVX3O', NOW(), '4826e21d1f6e7e4977a44e60399e89a6532514e7');

CREATE TABLE habitat
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE animal
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(255) NOT NULL,
    age INT,
    size INT,
    weight INT,
    state VARCHAR(255),
    last_meal_type VARCHAR(255),
    last_meal_qty VARCHAR(255),
    image VARCHAR(255),
    habitat_id INT,
    FOREIGN KEY (habitat_id) REFERENCES habitat(id)
);

CREATE TABLE vet_reviews
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date DATETIME,
    review TEXT,
    animal_id INT,
    FOREIGN KEY (animal_id) REFERENCES animal(id)
);

CREATE TABLE review
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    visitor_name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME,
    state VARCHAR(255)
);

CREATE TABLE schedules
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    days VARCHAR(255) NOT NULL,
    opening_time VARCHAR(255) NOT NULL,
    closing_time VARCHAR(255) NOT NULL
);

INSERT INTO schedules (days, opening_time, closing_time) VALUES ("7J/7", "9H00", "20H00");

CREATE TABLE services
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255)
);