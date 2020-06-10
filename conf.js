const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost' , // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  's8@%0oui23sLso', // le mot de passe
database :  'caval_cloud', // le nom de la base de données
});
module.exports = connection;