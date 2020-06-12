const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const connection = require('./conf');
const userRouter = require('./userRouter');
const horseRouter = require('./horseRouter')
const riderRouter = require('./riderRouter')
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/user', (req, res) => {
  connection.query('SELECT * from user', (err, results) =>{
 if (err) {

   // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
   res.status(500).send('Erreur lors de la récupération des noms des Users');
 } else {

   // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
   res.json(results);
 }
});


server.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`server is listening on ${port}`);
  }
});
