const express = require('express');
const app = express();
const horseRouter = express.Router();
const models = require('../models'); 
const Sequelize = require('sequelize');
const { Op } = require("sequelize")
const db = Sequelize.db;
const bodyParser = require('body-parser');
// const owner = require('../models/owner_presentation')

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


// Display horse with query 
horseRouter.get('/search/?', (req,res) => {
  const stroll = req.query.stroll
  const min = Number(req.query.height) - 10 || 0
  const max = Number(req.query.height) + 10 || 200
  const minHorseAge = Number (req.query.horseage) -3 || 0
  const maxHorseAge = Number (req.query.horseage) +3 || 30
  const minOwnerAge = Number (req.query.ownerage) -3 || 0
  const maxOwnerAge = Number (req.query.ownerage) +3 || 100
  models
  .Horse
  .findAll({
    where: {
      
      // horse_localisation : req.query.localisation ,
      horse_mensuel_price : {[Op.gte]: req.query.price},
      horse_stroll_along : stroll || {[Op.or] : [0,1]}, // Soit l'information est précisée, soit on propose tous les chevaux, peu importe si la balade  est possible ou non 
      horse_height  : { [Op.between]: [ min , max ]} || {[Op.lte] : 250}  , // Si la taille  est précisé, on sort un résultat avec une fourchette de + ou - 10, sinon on sort tous les résultats
      horse_age: { [Op.between]: [ minHorseAge , maxHorseAge ]} || {[Op.lte] : 30},
      horse_get_lesson : req.query.getlesson || {[Op.or] : [0,1]}, // le cheval peut prendre des leçons ou non 
      horse_get_coach : req.query.getcoach || {[Op.or] : [0,1]}, // le cheval peut prendre un coach exterieur ou non       
      horse_competition_preferences : req.query.competition || {[Op.like]: '%non%'},

      // trouver une solution pour remplacer le OP.any et creer un champ array 
      // horse_temper: {[Op.like] : { [Op.any]: [req.query.temper1, req.query.temper2]}} || {[Op.gt]: { [Op.all]: literal('SELECT 1') }}, //{[Op.like] : { [Op.any]: ['affectueux','froid', 'joueur','sensible',''] }} , 
      // horse_body_type : {[Op.like] : { [Op.any]: [req.query.bodytype1, req.query.bodytype2]}}  || {[Op.gt]: { [Op.all]: literal('SELECT 2') }} ,// || {},//{[Op.like] : { [Op.any]: ['fin','classique','porteur','lourd','']}} ,

      '$owner_age$': { [Op.between]: [ minOwnerAge , maxOwnerAge ]} || {[Op.lte] : 100} // selection du cheval en fonction de l'age du owner

    },    

    include : [models.Ideal_rider, models.Owner_presentation, models.User]
  })
  .then(x => res.json(x))

})

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