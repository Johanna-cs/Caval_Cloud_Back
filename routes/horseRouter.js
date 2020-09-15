const express = require('express');
const app = express();
const horseRouter = express.Router();
const models = require('../models'); 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwtUtils = require('../utils/jwt-utils')


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//Display all horses :

horseRouter.get('/', (req,res) => {
  models
    .Horse
    .findAll({
      include: [{
        model : models.User, 
        attributes : ['user_email', 'user_phone', 'user_avatar']
      }]})
    .then(x => res.json(x))
    .catch(err => res.send(err))


  }
)

//Display horses closest to the user :
horseRouter.get('/search/?', (req, res) => {

  // If user has specified is localisation only results concerned are taken in account :

  if (req.query.latitude && req.query.longitude !== null)  { 

    // Récupération de la position GPS du user :
    let lat = parseFloat(req.query.latitude)
    let lng = parseFloat(req.query.longitude)

    // Création du point géométrique :
    let location = Sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})', 4326)`)
    let distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.literal('horse_geolocation'), location)

    // Récupération de la distance maximale des résultats par rapport au user, si pas défini le rayon par défaut est de 1000km
    let distanceMax = req.query.distanceMax || 1000000

    models.Horse
      .findAll({
        attributes: {
            include: [[Sequelize.fn('ST_Distance_Sphere', Sequelize.literal('horse_geolocation'), location),'distance']]
        },
        order: distance,
        where : Sequelize.where(distance, {[Op.lte] : distanceMax}), // Seuls les résultats dont la distance max par rapport au user est respectée sont affichés
        include: [{
          model : models.User, 
          attributes : ['user_email', 'user_phone', 'user_avatar']
          }]  
      })
      .then(horses => res.json(horses))
      .catch(err => res.send(err))

    } 
    // Else all results are displayed without considering the user localisation
  else {
    models.Horse
    .findAll({
      include: [{
        model : models.User, 
        attributes : ['user_email', 'user_phone', 'user_avatar']
      }]})
      .then(horses => res.json(horses))
    .catch(err => res.send(err))
  }
})

// Display horse information from its ID :

horseRouter.get('/:id', (req,res) => {
  models
    .Horse
    .findAll({
      where: { horse_ID: req.params.id },
      include: [{
        model : models.User, 
        attributes : ['user_email', 'user_phone', 'user_avatar']
      }]})
    .then(x => res.json(x))
});


// Create a new horse :

horseRouter.post('/', (req,res) => {


   // Getting auth header
 let headerAuth  = req.headers['authorization'];
 let user_ID = jwtUtils.getUserId(headerAuth)

  // Getting user's GPS coordinates
 let lat = parseFloat(req.body.horse_lat) || null;
 let lng = parseFloat(req.body.horse_long) || null;

  // Le point géométrique pour ensuite calculer les résultats à proximité :
  let location = Sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})', 4326)`);

    models
      .Horse
      .create({
        horse_name : req.body.horse_name,
        horse_age : req.body.horse_age,
        horse_biography : req.body.horse_biography,
        horse_height : req.body.horse_height,
        horse_temper : req.body.horse_temper,
        horse_character : req.body.horse_character,
        horse_body_type : req.body.horse_body_type,
        horse_postal : req.body.horse_postal,
        horse_localisation : req.body.horse_localisation,
        horse_long : req.body.horse_long,
        horse_lat : req.body.horse_lat,
        horse_geolocation : location, 
        horse_photo1 : req.body.horse_photo1,
        horse_photo2 : req.body.horse_photo2,
        horse_photo3 : req.body.horse_photo3,
        horse_coaching_here : req.body.horse_coaching_here,
        horse_external_coach : req.body.horse_external_coach,
        horse_budget : req.body.horse_budget,
        horse_currency_budget : req.body.horse_currency_budget,
        horse_stroll_along : req.body.horse_stroll_along,
        horse_location_type : req.body.horse_location_type,
        horse_competition_preferences : req.body.horse_competition_preferences,
        horse_riding_frequency : req.body.horse_riding_frequency,
        horse_fixed_day : req.body.horse_fixed_day,
        horse_accomodation : req.body.horse_accomodation,
        horse_practice_structure : req.body.horse_practice_structure,
        horse_disciplines : req.body.horse_disciplines,
        horse_material : req.body.horse_material,
        user_ID : user_ID,
        owner_firstname : req.body.owner_firstname,
        owner_age : req.body.owner_age,
        owner_character : req.body.owner_caracter,
        owner_horse_work : req.body.owner_horse_work,
        owner_message : req.body.owner_message,
        owner_communication_frequency : req.body.owner_communication_frequency,
        ideal_rider_years_of_practice: req.body.ideal_rider_years_of_practice,
        ideal_rider_gallop_level : req.body.ideal_rider_gallop_level,
        ideal_rider_age : req.body.ideal_rider_age,
        ideal_rider_vehiculed : req.body.ideal_rider_vehiculed,
        ideal_rider_managed_horse: req.body.ideal_rider_managed_horse,
          }) 
      .then(x => res.json(x))
      .catch(err => res.send(err))
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