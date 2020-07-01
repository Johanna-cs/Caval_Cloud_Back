const express = require('express');
const app = express();
const riderRouter = express.Router();
const models = require('../models'); 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// // Display all riders :

riderRouter.get('/', (req,res) => {
  models
    .Rider
    .findAll({include: [models.Ideal_horse]})
    .then(x => res.json(x))

  }
)

// Display Rider with query 
riderRouter.get('/riders?', (req,res) => {
  models
  .Rider
  .findAll({
    
    where: {
      rider_age : req.query.age,
      rider_postal_code : req.query.postal
    },

    include : [models.Ideal_horse]
})
.then(x => res.json(x))
})
// Create a new rider :

riderRouter.post('/', (req,res) => {
  models
    .Rider
    .create(req.body)
    .then(x => res.json(x))
});

// Update rider information from its ID :

riderRouter.put('/:id', (req,res) => {
  models
    .Rider
    .update(req.body,{
      where: {
        rider_ID: req.params.id
      }
    })
    .then(x => res.json(x))
});

// Delete a rider from its ID :

riderRouter.delete('/:id', (req,res) => {
  models
    .Rider
    .destroy({
      where: {
        rider_ID : req.params.id
      }
    })
    .then(res.send("rider deleted"))
});



module.exports = riderRouter