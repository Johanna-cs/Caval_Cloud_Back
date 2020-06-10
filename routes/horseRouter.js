const express = require('express');
const app = express();
const horseRouter = express.Router();
const connection = require('../conf');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//Display all horses :
horseRouter.get('/', (req,res) => {
  connection.query(`SELECT * FROM horse`, (err, results) => {
    if (err) {
      res.send('erreur lors de la récupération de la liste des chevaux')
    } else {
      res.send(results)
    }
  })
});

// Create a new horse :
horseRouter.post('/', (req,res) => {
  const formData = req.body
  connection.query(`INSERT INTO horse SET ?`, formData, (err, results) => {
    if (err) {
      res.send(`erreur lors de la création d'un nouveau cheval`)
    } else {
      res.send(results)
    }
  })
});



module.exports = horseRouter