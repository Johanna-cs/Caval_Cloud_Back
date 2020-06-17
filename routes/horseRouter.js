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


// Update des infos utilisateur 
horseRouter.put('/:id', (req,res) => {
  models
    .Horse
    .update({horse_firstname : 'Nadir'},{
      where: {
        horse_ID: req.params.id
      }
    })
    .then(x => res.json(x))
});

// delete d'un user
horseRouter.delete('/:id', (req,res) => {
  models
    .Horse
    .destroy({
      where: {
        horse_ID : req.params.id
      }
    })
    .then(x => res.json(x))
});


module.exports = horseRouter