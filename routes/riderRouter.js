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
    .findAll({include: [models.User]})
    .then(x => res.json(x))

  }
)


// Display rider information from its ID :

riderRouter.get('/:id', (req,res) => {
  models
    .Rider
    .findAll({
      where: {
        rider_ID: req.params.id
      }
    })
    .then(x => res.json(x))
});

// Display Rider with query 
riderRouter.get('/search/?', (req,res) => {
  // const postal = req.query.localisation //.substr(0,2)
  // const min = Number(req.query.age) - 3 || 0
  // const max = Number(req.query.age) + 3 || 99
  // const level = Number(req.query.level) || 0
  // const vehiculed = req.query.vehiculed
  // const budget = req.query.budget || 0
  // const competition = req.query.competition || 0
  // const getLesson = req.query.lesson || 0
  // const managed = req.query.managed
  // const getYears = Number(req.query.years) || 0 
  // const disciplines = req.query.disciplines || ''
  // const ridingFrequency = req.query.frequency || ''
  // const regularity = req.query.regularity || 0
  // const other_discipline = req.query.other_discipline 


  models
  .Rider
  .findAll({
    where: {
      // [Op.and]:[

      // ],

        rider_postal_code : { [Op.like]: `%${req.query.localisation}%` },
        // rider_age : { [Op.between]: [ min , max ]} ,



      // rider_age : { [Op.between]: [ min , max ]} , // Si l'age est précisé, on sort un résultat avec une fourchette de + ou - 3, sinon on sort tous les résultats
      // rider_postal_code : req.query.postal || {[Op.lt]: 99999}, // Si le CP est précisé on en tient compte, sinon on prends tous les CP + les CP non renseignés
      // rider_gallop_level : {[Op.gte] : level }, // Soit le level est précisé, sinon on prend tous les résultats
      // rider_vehiculed : vehiculed || {[Op.or] : [0,1]}, // Soit l'information est précisée, soit on propose tous les cavaliers, peu importe si véhiculé ou non
      // rider_budget : { [Op.gte] : budget }, //
      // rider_competition : competition,
      // rider_get_lessons : getLesson,
      // // rider_caracteristic_riding1 : 
      // // rider_caracteristic_riding2 :
      // // rider_caracteristic3 : 
      // // concours possible ou non
      // rider_competition : {[Op.like] : competition}, // soit non, soit obligatoire, soit possible
      // // rider_get_lessons : getLesson || {[Op.or] : [0,1]}, // non 
      // rider_years_of_practice : {[Op.gte] : getYears },
      // // rider_disciplines : {[Op.like] : disciplines}, // si renseignée, alors uniquement les résultats avec une discipline, sinon tous les résultats
      // rider_riding_frequency : {[Op.like] : ridingFrequency },
      // rider_fixed_day : regularity || {[Op.or] : [0,1]},
      // // rider_agree_other_discipline : other_discipline || {[Op.or] : [0,1]}
    },

    // include : [models.Ideal_horse]
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