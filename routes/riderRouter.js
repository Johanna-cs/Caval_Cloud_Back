const express = require('express');
const app = express();
const riderRouter = express.Router();
const connection = require('../conf');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//Affiche l'ensemble des riders :
riderRouter.get('/', (req,res) => {
  connection.query(`SELECT * FROM rider`, (err, results) => {
    if (err) {
      res.send('erreur lors de la récupération de la liste des cavaliers')
    } else {
      res.send(results)
    }
  })
});

// Créer un rider :
riderRouter.post('/', (req,res) => {
  const formData = req.body
  connection.query(`INSERT INTO rider SET ?`, formData, (err, results) => {
    if (err) {
      res.send(`erreur lors de la création d'un nouveau rider`)
    } else {
      res.send(results)
    }
  })
});



module.exports = riderRouter