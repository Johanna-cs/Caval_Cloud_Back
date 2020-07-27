const express = require('express');
const app = express();
const idealRiderRouter = express.Router();
const models = require('../models'); 


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// display all ideal rider :

idealRiderRouter.get('/', (req,res) => {
    models
      .Ideal_rider
      .findAll({include : [models.Horse]})
      .then(x => res.json(x))
  });

// Create a new ideal rider  :

idealRiderRouter.post('/', (req,res) => {
  models
    .Ideal_rider
    .create(req.body, {
      where: {
        horse_ID:req.params.id
      }
    })
    .then(x => res.json(x))
});


// Update Rider information from its ID :

idealRiderRouter.put('/:id', (req,res) => {
  models
    .Ideal_rider
    .update(req.body, {
      where: {
          ideal_rider_ID: req.params.id
      }
  })
    .then(x => res.json(x))
});

// Delete a idealRider from its ID :

idealRiderRouter.delete('/:id', (req,res) => {
  models
    .Ideal_rider
    .destroy({
      where: {
        ideal_rider_ID : req.params.id
      }
    })
    .then(res.send("Ideal Rider deleted"))
});



  module.exports = idealRiderRouter
