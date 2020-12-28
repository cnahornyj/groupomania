# Groupomania
## Le réseau social d'entreprise

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
### Créer une base de données dans MySQL <br> et renseignez vos variables d'environnement dans le fichier .env.example dans le dossier backend
`echo "HOST = localhost
DATABASE = DB_NAME
DB_USERNAME = DB_USERNAME
DB_PASSWORD = DB_PASSWORD
PORT = PORT
SECRET_KEY = YOUR_SECRET_KEY" > .env.example`<br>
`mv .env.example .env`

#### Pour lancer le backend → Exécutez la commande `nodemon server`<br> Pour lancer le frontend → Ouvrir un second terminal et exécutez la commande `npm run serve`


## Technologies utilisées

### Frontend
* VueJS

### Backend
* ExpressJS