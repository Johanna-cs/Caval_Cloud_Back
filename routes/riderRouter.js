const express = require('express');
const app = express();
const riderRouter = express.Router();
const models = require('../models'); 
const Sequelize = require('sequelize');
const { Op } = require("sequelize")
const db = Sequelize.db;
const bodyParser = require('body-parser');


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.urlencoded({
  extended : true
}))


// // Display all riders :

riderRouter.get('/', (req,res) => {
  models
    .Rider
    .findAll({include: [models.Ideal_horse]})
    .then(x => res.json(x))

  }
)

// Display Rider with query 
riderRouter.get('/search/?', (req,res) => {
  const min = Number(req.query.age) - 3
  const max = Number(req.query.age) + 3
  models
  .Rider
  .findAll({
    where: {
      rider_age :{ [Op.between]: [ Number(req.query.age) - 3 , Number(req.query.age) + 3]} ||{[Op.lt]: 100} || {[Op.like] : null}, // Si l'age est précisé, on sort un résultat avec une fourchette de + ou - 3, sinon on sort tous les résultats
      rider_postal_code : req.query.postal || {[Op.lt]: 99999} || {[Op.like] : null},
      // rider_gallop_level : req.query.level || {[Op.lt]: 7} || {[Op.like] : null},
      // rider_vehiculed : req.query.vehiculed,
      // rider_budget : {[Op.lt]: req.query.budget} || {[Op.lt]: 10000}

      // rider_caracteristic_riding1 : 
      // rider_caracteristic_riding2 :
      // rider_caracteristic3 : 
      // rider_gallop_level :


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