const express = require('express');
const app = express();
const horseRouter = express.Router();
const models = require('../models'); 
const Sequelize = require('sequelize');
const { Op } = require("sequelize")
const db = Sequelize.db;
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
    .findAll({include: [models.Ideal_rider, models.Owner_presentation, models.User]})
    .then(x => res.json(x))

  }
)


// Display horse with query 
horseRouter.get('/search/?', (req,res) => {
  const min = Number(req.query.height) - 5 || 0
  const max = Number(req.query.height) + 5 || 200
  const minHorseAge = Number (req.query.horseage) -2 || 0
  const maxHorseAge = Number (req.query.horseage) +2 || 30
  const minOwnerAge = Number (req.query.ownerage) -3 || 0
  const maxOwnerAge = Number (req.query.ownerage) +3 || 100
  models
  .Horse
  .findAll({
    where: {
      
      // horse_localisation : req.query.localisation ,
      horse_budget : {[Op.lte]: req.query.budget},      
      // horse_disciplines:{ [Op.ilike]: '%req.query.discipline%'},//|| {[Op.all]:'SELECT 1' }  , // || {[Op.any]: [Obstacle, Dressage, Cce,Trec-Equifun, Balade-Randonnée, Ethologie-Equifeel, Hunter, Horse-Bamm, Pony-Games, Reining - Western, Endurance, Attelage, Voltige, Disciplines-culturelles   ] } , 
      horse_stroll_along : req.query.stroll || {[Op.or] : [0,1]}, // Soit l'information est précisée, soit on propose tous les chevaux, peu importe si la balade  est possible ou non 
      horse_height  : { [Op.between]: [ min , max ]} || {[Op.lte] : 250}  , // Si la taille  est précisé, on sort un résultat avec une fourchette de + ou - 10, sinon on sort tous les résultats
      horse_age: { [Op.between]: [ minHorseAge , maxHorseAge ]} || {[Op.lte] : 30},
      horse_competition_preferences : req.query.competition || {[Op.like]: '%non%'}, // preference du owner concernant la possibilité 
      horse_location_type:{ [Op.like]: '%req.query.loctype%'} || {[Op.like]:'' } ,//
      horse_accomodation: { [Op.like]: '%req.query.accomodation%'} || {[Op.like]:'SELECT 1' },//
      // horse_coaching_here :req.query.lesson|| 0,// le cheval peut prendre des leçons ou non 
      // horse_external_coach: req.query.coach||0, // le cheval peut prendre un coach exterieur ou non      
      // horse_own_saddle : req.query.saddle || 0,//

      // horse_temper: { [Op.like]: '%req.query.temper%'} || {[Op.all]:'SELECT 1' }, //{[Op.like] : { [Op.any]: ['affectueux','froid', 'joueur','sensible',''] }} , 
      // horse_body_type : { [Op.like]: '%req.query.bodytype%'} || {[Op.all]:'SELECT 1' }  ,// || {},//{[Op.like] : { [Op.any]: ['fin','classique','porteur','lourd','']}} ,
      // horse_practice_structure:  { [Op.like]: '%req.query.structure%'} || {[Op.all]:'SELECT 1' },

      // '$owner_age$': { [Op.between]: [ minOwnerAge , maxOwnerAge ]} || {[Op.lte] : 100}, // selection du cheval en fonction de l'age du owner
      // '$owner_communication_frequences$': req.query.comfreq||{[Op.or]: [1,3 ]}, // Selection du cheval en fonction de la frequence de communication du owner
      // '$owner_horse_work$': { [Op.like]: '%req.query.horsework%'} || {[Op.or]: ['ouvert', 'normal', 'cadré' ]},

    },    

    include : [models.Ideal_rider, models.Owner_presentation, models.User]
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
    },{include: [models.Ideal_rider, models.Owner_presentations, models.User]})
    .then(x => res.json(x))
});


// Create a new horse :

horseRouter.post('/', (req,res) => {
  models
    .Horse
    .create(req.body)
    .then(
      Horse.addowner_presentations(Horse.ownerPres_ID), 
      Horse.addIdeal_rider(Horse.idealRider_ID)
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