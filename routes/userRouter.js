const express = require('express');
const app = express();
const userRouter = express.Router();
const models = require('../models'); 


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Affiche l'ensemble des utilisateurs :
userRouter.get('/', (req,res) => {
  models
    .User
    .findAll()
    .then(x => res.json(x))

  }
)

// Création d'un nouvel utilisateur :
userRouter.post('/', (req,res) => {
  models
    .User
    .create(req.body)
    .then(x => res.json(x))
});

module.exports = userRouter