# Groupomania
## Le réseau social d'entreprise

![groupomania_preview](https://user-images.githubusercontent.com/50677355/103230945-ee4cbc00-4936-11eb-8a9e-9c4a59ac9100.png)

## Prérequis

* NodeJS
* MySQL

## Installation

`git clone https://github.com/cnahornyj/groupomania.git`<br>
`cd groupomania`<br>
`cd frontend`<br>
`npm install`<br>
`cd ..`<br>
`cd backend`<br>
`npm install`<br>
### Créez une base de données dans MySQL <br> et renseignez vos variables d'environnement dans le fichier .env.example dans le dossier backend
`echo "HOST = localhost
DATABASE = DB_NAME
DB_USERNAME = DB_USERNAME
DB_PASSWORD = DB_PASSWORD
PORT = PORT
SECRET_KEY = SECRET_KEY" > .env.example`<br>
`mv .env.example .env`

Pour lancer le backend → Exécutez la commande `nodemon server` dans le dossier backend<br> Pour lancer le frontend → Ouvrir un second terminal et exécutez `npm run serve` dans le dossier frontend<br> Dans un troisième terminal vous pouvez accédez à la BDD pour voir les changements en temps réel

## Technologies utilisées

### Frontend
* VueJS

### Backend
* ExpressJS