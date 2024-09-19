# ARCADIA

Site vitrine pour un zoo

# Identifiants de test

Pour les identifiants, consultez le manuel d'utilisation au format PDF fourni avec la copie de l'examen

# Installation en local

Installez un IDE (par exemple Visual Studio Code), ainsi que XAMPP depuis leur site internet.
Démarrez XAMPP, et démarrez le serveur Apache et MySQL.
Dans le dossier C:\xampp\htdocs de votre ordinateur, créez un dossier ARCADIA et clonez-y le dépôt git dont le lien est fourni dans la copie.

Créer la base de données:

        Dans un moteur de recherche, ouvrez PhpMyAdmin.
        Dans votre IDE, accédez aux fichiers qui ont été clonés depuis le lien git. Vous devriez avoir deux fichiers au format .sql. Copiez le texte de database_creation.sql.
        Retournez sur PhpMyAdmin, et cliquez sur "SQL" en haut de la page. Dans le champ prévu, collez le texte.
        Appuyez sur executer (en bas a droite). Cela devrait vous générer des messages de succès en vert.

        La base de données est créée, avec les tables correspondantes.

Ajouter des données à la base:

        En revenant sur votre IDE, répétez les étapes précédentes de Copier/Coller avec le second fichier, data_examples.sql.
        Cela devrait générer quelques données pour chaque table, afin de pouvoir tester chaque fonctionnalité.

Pour que votre application puisse accéder à cette base et aux données, n'oubliez pas de configurer la connexion :

        Dans le dossier backend, vous devriez trouver un fichier ".env".
        Afin de sécuriser au mieux l'accès aux données, ce fichier ne doit pas être modifié. Créez en une copie en faisant un clic droit sur le fichier dans l'explorer à gauche de l'IDE, puis renommez-le ".env.local".

        Ici, vous devriez avoir cette ligne :
                DATABASE_URL="mysql://root:root_password@127.0.0.1:3306/my_database?serverVersion=mariadb-10.4.32"
                                      ^1^   ^2^                          ^3^
        Différents champs sont à remplacer pour vous connecter à la base :

                ·le premier "root" sera le nom de l'utilisateur sur phpMyAdmin (si vous n'avez pas créé de nouveau compte, l'utilisateur "root" devrait fonctionner)

                ·le second "root_password" correspond au mot de passe de l'utilisateur (si vous utilisez "root", aucun mot de passe n'est normalement attendu, vous pouvez donc simplement supprimer "root_password" et laisser comme cela)

                ·enfin, "my_database" correspond au nom que vous avez donné à la base de donnée créée pour votre application. Si vous avez suivi les étapes précédentes pour créer la base de données en copiant le fichier fourni, vous devriez remplacer ceci par "arcadia".

        Et voilà, vous devriez pouvoir accéder à l'application et aux données de la base sans problème !
        Pour accéder au site en local, il vous suffit maintenant d'accéder à votre moteur de recherche, et d'y chercher "localhost".
                                Bonne découverte !