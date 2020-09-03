const express = require('express');
const app = express();
const riderRouter = express.Router();
const models = require('../models'); 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwtUtils = require('../utils/jwt-utils')
const bp = require("body-parser");

app.use(express.json());
app.use(bp.urlencoded({ extended: true }));



// // Display all riders :

riderRouter.get('/', (req,res) => {
  models
    .Rider
    .findAll({
      include: [{
        model : models.User, 
        attributes : ['user_email', 'user_phone', 'user_avatar']
      }]})
    .then(x => res.json(x))

  }
)


// Display Rider with query 
riderRouter.get('/search/?', (req, res) => {

  // If user has specified is localisation only results concerned are taken in account :

  if (req.query.latitude && req.query.longitude !== null)  { 

    // Récupération de la position GPS du user :
    let lat = parseFloat(req.query.latitude)
    let lng = parseFloat(req.query.longitude)

    // Création du point géométrique :
    let location = Sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})', 4326)`)
    let distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.literal('rider_geolocation'), location)

    // Récupération de la distance maximale des résultats par rapport au user, si pas défini le rayon par défaut est de 100km
    let distanceMax = req.query.distanceMax || 100000

    models.Rider
      .findAll({
        attributes: {
            include: [[Sequelize.fn('ST_Distance_Sphere', Sequelize.literal('rider_geolocation'), location),'distance']]
        },
        order: distance,
        where : Sequelize.where(distance, {[Op.lte] : distanceMax}), // Seuls les résultats dont la distance max par rapport au user est respectée sont affichés
        include: [{
          model : models.User, 
          attributes : ['user_email', 'user_phone', 'user_avatar']
          }]
        })
      .then(riders => res.json(riders))
      .catch(err => res.send(err))

    } 
    // Else all results are displayed without considering the user localisation
  else {
    models.Rider
    .findAll({
      include: [{
        model : models.User, 
        attributes : ['user_email', 'user_phone', 'user_avatar']
      }]})
      .then(riders => res.json(riders))
    .catch(err => res.send(err))
  }
})


// Display rider information from its ID :

riderRouter.get('/:id', (req,res) => {
  models
    .Rider
    .findAll({
      where: { rider_ID: req.params.id },
      include: [{
        model : models.User, 
        attributes : ['user_email', 'user_phone', 'user_avatar']
      }]})
    .then(x => res.json(x))
});


// Create a new rider :

riderRouter.post('/', (req,res) => {

// Getting auth header
 let headerAuth  = req.headers['authorization'];
 let user_ID = jwtUtils.getUserId(headerAuth)

 // Getting user's GPS coordinates
 let lat = parseFloat(req.body.rider_lat) || null;
 let lng = parseFloat(req.body.rider_long) || null;

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
      rider_geolocation : location,
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
  // riderRouter.put('/:id', (req,res) => {
  //   models
  //     .Rider
  //     .update(req.body,{
  //       where: {
  //         rider_ID: req.params.id
  //       }
  //     })
  //     .then(x => res.json(x))
  // });

// Delete a rider from its ID :
//   riderRouter.delete('/:id', (req,res) => {
//     models
//       .Rider
//       .destroy({
//         where: {
//           rider_ID : req.params.id
//         }
//       })
//       .then(res.send("rider deleted"))
// });



module.exports = riderRouter