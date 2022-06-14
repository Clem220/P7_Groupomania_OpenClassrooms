# Projet 7 - Groupomania !
***
## Prérequis :

Il vous faut avoir installé sur votre machine :

Git : https://git-scm.com/downloads
Node.js : https://nodejs.org/en/
MySql : https://dev.mysql.com/downloads/installer/

Dans le dossier backend,  créer un fichier .env
Ajoutez y les champs suivant en renseignant leurs valeurs: 

DB_USERNAME = (nom d'utilisateur mysql ex: root)
DB_PASSWORD = (mot de passe d'accès à votre base de données mysql)
DB_HOST = (lien de la base de données mysql ex:127.0.0.1)
DB_NAME = (nom de la base de données mysql)
SECRET_KEY = (clé de cryptage du token)

## Frontend

Ouvrir le dossier "src" dans le terminal de votre éditeur puis exécuter la commande:

$ npm install

puis

$ npm start
si le navigateur ne s'ouvre pas automatiquement allez à :

http://localhost:8080/

## Backend

Créez un dossier images dans le dossier backend, il stockera les photos envoyées par les utilisateurs de Groupomania.

Ouvrir le dossier Backend dans le terminal de votre éditeur puis exécuter la commande:

$ npm install

puis

$ nodemon serve

## Création d'un admin
Dans un terminal accédez à votre base de données, entrez la ligne suivante pour connaitre les id des différents utilisateurs: 

$ SELECT * FROM Users;

Recherchez l'id voulut dans la réponse envoyée par le terminal puis entrez la ligne suivante:

$ UPDATE Users SET isAdmin = true WHERE id = (id de l'utilisateur concerné);