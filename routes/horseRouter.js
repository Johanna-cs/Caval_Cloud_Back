const express = require('express');
const app = express();
const horseRouter = express.Router();
const models = require('../models'); 


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//Display all horses :
horseRouter.get('/', (req,res) => {
  models
    .Horse
    .findAll()
    .then(x => res.json(x))

  }
)

// Créer un horse :
horseRouter.post('/', (req,res) => {
  models
    .Horse
    .create(req.body)
    .then(x => res.json(x))
});




module.exports = horseRouter