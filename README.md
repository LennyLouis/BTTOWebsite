# BTTO-WEBSITE

Ce fichier contient les principales étapes afin d'installer le projet sur votre machine.
Quelques pré-requis :

  - [NodeJs][node] 
  - [Git][git]
  - [Xampp (phpMyAdmin)][xampp]

### Installation

Téléchargez le répertoire complet de l'application, rendez-vous à la racine du projet et ouvrez un terminal (clic droit + Git Bash Here)

```sh
$ npm install
```

> Un dossier "node_modules" apparait alors à la racine du projet, 
>  il contient les différentes librairies nécessaires pour le bon fonctionnement du projet.

### Base de données

Créez une nouvelle base de données vide via phpMyAdmin à l'aide de Xampp puis ouvrez le fichier config.json qui se trouve dans le dossier "config" du projet. Ce fichier contient les différentes connexions aux base de données pour le serveur de dev, test et prod. Vous pouvez remplir le champ "dev" si vous lancer le projet en local : 

```json
"development": {
    "username": "my_db_username",
    "password": "my_db_password",
    "database": "db_name",
    "host": "127.0.0.1",
    "dialect": "mysql"
 }
 ```
 
### Lancement du serveur
 
 A la racine du projet, éxécutez la commande suivante : 
 
 ```sh
 $ npm start
 ```
 
 Ouvrez votre navigateur web préféré et rentrez cette adresse : 
 
 ```sh
localhost:3000
```
### Technologies

* [Node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Sequelize] - ORM
* [AngularJS] - HTML enhanced for web apps!
* [jQuery] - duh
* [Twitter Bootstrap] - great UI boilerplate for modern web apps

   [node]: <https://nodejs.org/en/>
   [git]: <https://git-scm.com/>
   [xampp]: <https://www.apachefriends.org/fr/index.html>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Sequelize]: <http://docs.sequelizejs.com/en/v3/>
   [Gulp]: <http://gulpjs.com>
