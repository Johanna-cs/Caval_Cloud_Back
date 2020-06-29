const express = require('express');
const app = express();
const idealHorseRouter = express.Router();
const models = require('../models'); 


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// display all ideal horse :

idealHorseRouter.get('/', (req,res) => {
    models
      .Ideal_horse
      .findAll()
      .then(x => res.json(x))
  });

// Create a new horse :

idealHorseRouter.post('/', (req,res) => {
  models
    .Ideal_horse
    .create(req.body)
    .then(x => res.json(x))
});


// Update horse information from its ID :

idealHorseRouter.put('/:id', (req,res) => {
  models
    .Ideal_horse
    .update(req.body, {
      where: {
          ideal_horse_ID: req.params.id
      }
  })
    .then(x => res.json(x))
});

// Delete a horse from its ID :

idealHorseRouter.delete('/:id', (req,res) => {
  models
    .Ideal_horse
    .destroy({
      where: {
        ideal_horse_ID : req.params.id
      }
    })
    .then(res.send("ideal horse deleted"))
});




  module.exports = idealHorseRouter
