const express = require('express');
const app = express();
const horseRouter = express.Router();

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
  console.log(formData)
  connection.query(`INSERT INTO horse SET ?`, formData, (err, results) => {
    if (err) {
      res.send(err)
    } else {
      res.send('succès lors de la création du nouveau cheval')
    }
  })
});



module.exports = horseRouter