const express = require('express');
const app = express();
const riderRouter = express.Router();
const models = require('../models'); 
const Sequelize = require('sequelize');
const { Op } = require("sequelize")
const bodyParser = require('body-parser');
const jwtUtils = require('../utils/jwt-utils')



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
      where: { rider_ID: req.params.id },
      include: [models.User]})
    .then(x => res.json(x))
});

// Display Rider with query 
riderRouter.get('/search/?', (req,res) => {
  const postal = req.query.localisation //.substr(0,2)
  const min = Number(req.query.age) - 3 || 0
  const max = Number(req.query.age) + 3 || 99
  const level = Number(req.query.level) || 0
  const vehiculed = req.query.vehiculed
  const budget = req.query.budget || 0
  const competition = req.query.competition || 0
  const getLesson = req.query.lesson || 0
  const managed = req.query.managed
  const getYears = Number(req.query.years) || 0 
  const disciplines = req.query.disciplines || ''
  const ridingFrequency = req.query.frequency || ''
  const regularity = req.query.regularity || 0
  const other_discipline = req.query.other_discipline 


  models
  .Rider
  .findAll({
    where: {
      [Op.and]:[
        {rider_postal_code : { [Op.like]: '%'+ postal  }},
        {rider_gallop_level : {[Op.gte] : level }},
        {rider_age : { [Op.between]: [ min , max ]}},
        {rider_vehiculed : vehiculed || {[Op.or] : [0,1]}},
        {rider_managed_horse :req.query.managed || {[Op.or] : [0,1]}},
        {rider_disciplines :{ [Op.like]: `%${req.query.discipline}%`}},
        {rider_riding_frequency: { [Op.like]: `%${req.query.frequency}%`}},
        {rider_fixed_day : req.query.fixed || {[Op.or] : [0,1]}},
        {rider_own_saddle : req.query.saddle || {[Op.or] : [0,1]}},
        {rider_competition : req.competition}
      ],

        // 



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

// Getting auth header
 let headerAuth  = req.headers['authorization'];
 let user_ID = jwtUtils.getUserId(headerAuth)

 // Getting user's GPS coordinates
 let lat = parseFloat(req.body.horse_lat) || 1;
 let lng = parseFloat(req.body.horse_long) || 2 ;

// Le point géométrique pour ensuite calculer les résultats à proximité :
let location = Sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})', 4326)`);


  models
    .Rider
    .create({
      rider_firstname: req.body.rider_firstname,
      rider_avatar: req.body.rider_avatar,
      rider_photo1: req.body.rider_photo1,
      rider_photo2: req.body.rider_photo2,
      rider_photo3: req.body.rider_photo3,
      rider_age: req.body.rider_age,
      rider_postal_code: req.body.rider_postal_code,
      rider_localisation : req.body.localisation,
      rider_long : req.body.rider_long,
      rider_lat : req.body.rider_lat,
      rider_biography: req.body.rider_biography,
      rider_selfWord1: req.body.rider_selfWord1,
      rider_selfWord2: req.body.rider_selfWord2,
      rider_selfWord3: req.body.rider_selfWord3,
      rider_ridingWord1: req.body.rider_ridingWord1,
      rider_ridingWord2: req.body.rider_ridingWord2,
      rider_ridingWord3: req.body.rider_ridingWord3,
      rider_riding_frequency: req.body.rider_riding_frequency,
      rider_fixed_day: req.body.rider_fixed_day,
      rider_budget: req.body.rider_budget,
      rider_currency_budget: req.body.rider_currency_budget,
      rider_own_saddle: req.body.rider_own_saddle,
      rider_disciplines: req.body.rider_disciplines,
      rider_agree_other_discipline: req.body.rider_agree_other_discipline,
      rider_years_of_practice: req.body.rider_years_of_practice,
      rider_gallop_level: req.body.rider_gallop_level,
      rider_vehiculed: req.body.rider_vehiculed,
      rider_managed_horse: req.body.rider_managed_horse,
      rider_competition: req.body.rider_competition,
      rider_coaching_here: req.body.rider_coaching_here,
      rider_external_coach: req.body.rider_external_coach,
      ideal_horse_size: req.body.ideal_horse_size,
      ideal_horse_temper: req.body.ideal_horse_temper,
      ideal_horse_character: req.body.ideal_horse_character,
      ideal_horse_body_type: req.body.ideal_horse_body_type,
      ideal_horse_age: req.body.ideal_horse_age,
      user_ID : user_ID
    })
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