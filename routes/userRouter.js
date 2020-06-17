const express = require('express');
const app = express();
const userRouter = express.Router();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// Affiche l'ensemble des utilisateurs :
userRouter.get('/', (req,res) => {
  connection.query(`SELECT * FROM user`, (err, results) => {
    if (err) {
      res.send('erreur lors de la récupération de la liste des utilisateurs')
    } else {
      res.send(results)
    }
  })
})

// Création d'un nouvel utilisateur :
userRouter.post('/', (req,res) => {
  const formData = req.body
  connection.query(`INSERT INTO user SET ?`, formData, (err, results) => {
    if (err) {
      res.send(`erreur lors de la création du nouvel utilisateur`)
    } else {
      res.send('succès lors de la création du nouveau utilisateur')
    }
  })
});

module.exports = userRouter