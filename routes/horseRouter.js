const express = require('express');
const app = express();
const horseRouter = express.Router();
const models = require('../models'); 
const Sequelize = require('sequelize');
// const { Op } = require("sequelize")
// const db = Sequelize.db;
const Op = Sequelize.Op;
const bodyParser = require('body-parser');
const owner = require('../models/owner_presentation')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//Display all horses :

horseRouter.get('/', (req,res) => {
  models
    .Horse
    .findAll({include: [models.User]})
    .then(x => res.json(x))

  }
)


// Display horse with query 
horseRouter.get('/search/?', (req,res) => {
  const min = Number(req.query.height) - 5 || 0;
  const max = Number(req.query.height) + 5 || 200;
  const discipline = req.query.discipline ;
  const structure = req.query.structure ;
  const rythme = req.query.rythme ;


  const minHorseAge = Number (req.query.horseage) -2 || 0;
  const maxHorseAge = Number (req.query.horseage) +2 || 30;
  const minOwnerAge = Number (req.query.ownerage) -3 || 0;
  const maxOwnerAge = Number (req.query.ownerage) +3 || 100;
  models
  .Horse
  .findAll({
    where: { 

      // horse_localisation : req.query.localisation ,
      [Op.and]: [
        {horse_budget :  {[Op.lte]: req.query.budget} },//||{[Op.gte]: 1}}, // on get tous les chevaux avec une budgets inferieur au budget du cavalier ou a defaut tout les budget superieur à 1
        {horse_disciplines:{ [Op.like]: '%'+ discipline }}, // on get tous les chevaux avec la disicpline choisis où à defaut toutes les disciplines terminant par e 
        {horse_practice_structure: { [Op.like]: '%'+ structure }},
        {horse_riding_frequency : { [Op.like]: '%'+ rythme }},
        {horse_stroll_along : req.query.stroll },
        {horse_age: { [Op.between]: [ minHorseAge , maxHorseAge ]} },
        {horse_character: { [Op.like]: '%'+ req.query.character}},
        {horse_body_type :{ [Op.like]: '%'+ req.query.type}},
        {horse_height  : { [Op.between]: [ min , max ]}},
        {horse_age: { [Op.between]: [ minHorseAge , maxHorseAge ]}},
        {owner_age: { [Op.between]: [ minOwnerAge , maxOwnerAge ]}},
        {owner_caracter: { [Op.like]: '%'+ req.query.ownercaracter}},
        {owner_communication_frequency:   {[Op.like]:req.query.communication}},
        {horse_fixed_day: req.query.fixed},
        {owner_horse_work: req.query.work},
        {horse_location_type:{ [Op.like]: '%'+req.query.loctype}},
        {horse_accomodation: { [Op.like]: '%'+req.query.accomodation}},
        {horse_coaching_here :req.query.coachhere},
        {horse_external_coach: req.query.coachext},
        {horse_rider_need_own_saddle: req.query.material},
        {horse_competition_preferences : req.query.competition},

      ], 

      
      
      
      // horse_practice_structure: { [Op.like]: '%'+ structure },
      // horse_riding_frequency : { [Op.like]: '%'+ rythme },
      // horse_stroll_along : req.query.stroll || {[Op.or] : [0,1]}, // Soit l'information est précisée, soit on propose tous les chevaux, peu importe si la balade  est possible ou non 
      // horse_height  : { [Op.between]: [ min , max ]} || {[Op.lte] : 250}  , // Si la taille  est précisé, on sort un résultat avec une fourchette de + ou - 10, sinon on sort tous les résultats
      // horse_age: { [Op.between]: [ minHorseAge , maxHorseAge ]} || {[Op.lte] : 30},
      // horse_temper: { [Op.like]: '%'+ req.query.temper}|| {[Op.like] : { [Op.any]: ['affectueux','froid', 'joueur','sensible'] }} , 
      // horse_character: { [Op.like]: '%'+ req.query.character},
      // horse_body_type :{ [Op.like]: '%'+ req.query.type},
      // owner_communication_frequency:   {[Op.like]:req.query.communication},
      // owner_caracter: { [Op.like]: '%'+ req.query.ownercaracter},
      // horse_competition_preferences : req.query.competition || {[Op.like]: '%'+ 'non'}, // preference du owner concernant la possibilité 
      // owner_horse_work: req.query.work,
      // horse_location_type:{ [Op.like]: '%'+req.query.loctype} ,
      // horse_accomodation: { [Op.like]: '%'+req.query.accomodation},




      // horse_coaching_here :req.query.lesson|| 0,// le cheval peut prendre des leçons ou non 
      // horse_external_coach: req.query.coach||0, // le cheval peut prendre un coach exterieur ou non      
      // horse_own_saddle : req.query.saddle || 0,//

      // horse_body_type : { [Op.like]: '%req.query.bodytype%'} || {[Op.all]:'SELECT 1' }  ,// || {},//{[Op.like] : { [Op.any]: ['fin','classique','porteur','lourd','']}} ,
      // horse_practice_structure:  { [Op.like]: '%req.query.structure%'} || {[Op.all]:'SELECT 1' },

    },    

    include : [ models.User]
  })
  .then(x => res.json(x))

})
// Display horse information from its ID :

horseRouter.get('/:id', (req,res) => {
  models
    .Horse
    .findAll({
      where: {
        horse_ID: req.params.id
      }
    },{include: [models.User]})
    .then(x => res.json(x))
});


// Create a new horse :

horseRouter.post('/', (req,res) => {
  models
    .Horse
    .create(req.body)
    .then(x => res.json(x)
      // Horse.addowner_presentations(Horse.ownerPres_ID), 
      // Horse.addIdeal_rider(Horse.idealRider_ID)
    
    )
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