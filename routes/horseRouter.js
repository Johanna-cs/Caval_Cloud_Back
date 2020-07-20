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
    .findAll({include: [models.Ideal_rider, models.Owner_presentation, models.User]})
    .then(x => res.json(x))

  }
)

// Display horse information from its ID :

horseRouter.get('/:id', (req,res) => {
  models
    .Horse
    .findAll({
      where: {
        horse_ID: req.params.id
      }
    })
    .then(x => res.json(x))
});


// Create a new horse :

horseRouter.post('/', (req,res) => {
  models
    .Horse
    .create(req.body)
    .then(x => res.json(x))
});


// Update horse information from its ID :

horseRouter.put('/:id', (req,res) => {
  models
    .Horse
    .update(req.body, {
      where: {
          horse_ID: req.params.id
      }
  })
    .then(x => res.json(x))
});

// Delete a horse from its ID :

horseRouter.delete('/:id', (req,res) => {
  models
    .Horse
    .destroy({
      where: {
        horse_ID : req.params.id
      }
    })
    .then(res.send("horse deleted"))
});


module.exports = horseRouter