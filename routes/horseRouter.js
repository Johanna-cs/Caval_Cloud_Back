const express = require('express');
const app = express();
const horseRouter = express.Router();
const models = require('../models'); 
const Sequelize = require('sequelize');
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

//Display horses closest to the user :
horseRouter.get('/research/?', (req, res) => {

  // If user has specified is localisation only results concerned are taken in account :

  if (req.query.horse_lat && req.query.horse_long !== null)  { 

    // Récupération des coordonnées GPS du user :
    let lat = parseFloat(req.query.horse_lat)
    let lng = parseFloat(req.query.horse_long)

    // Création du point géométrique :
    let location = Sequelize.literal(`ST_GeomFromText('POINT(${lng} ${lat})', 4326)`)
    let distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.literal('horse_geolocation'), location)

    // Récupération de la distance maximale des résultats par rapport au user, si pas défini le rayon par défaut est de 50km
    let distanceMax = req.query.distanceMax || 50000

    models.Horse
      .findAll({
        attributes: {
            include: [[Sequelize.fn('ST_Distance_Sphere', Sequelize.literal('horse_geolocation'), location),'distance']]
        },
        order: distance,
        where : Sequelize.where(distance, {[Op.lte] : distanceMax}), // Seuls les résultats dont la distance max par rapport au user est respectée sont affichés
        })
      .then(function(instance){
          res.json(instance);
        })
    } 
    // Else all results are displayed without considering the user localisation
  else {
    models.Horse
    .findAll({
      include : [ models.User]
      })
    .then(x => res.json(x))
      }
})


// Display horse with query 
horseRouter.get('/search/?', (req,res) => {
  // const postal = req.query.localisation.substr(0,2)
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
      // [Op.and]: [
      //   // {horse_localisation : { [Op.like]: '%'+ postal }},
      //   {horse_budget :  {[Op.lte]: req.query.budget} },//||{[Op.gte]: 1}}, // on get tous les chevaux avec une budgets inferieur au budget du cavalier ou a defaut tout les budget superieur à 1
      //   {horse_disciplines:{ [Op.like]: '%'+ discipline }}, // on get tous les chevaux avec la disicpline choisis où à defaut toutes les disciplines terminant par e 
      //   {horse_practice_structure: { [Op.like]: '%'+ structure }},
      //   {horse_riding_frequency : { [Op.like]: '%'+ rythme }},
      //   {horse_stroll_along : req.query.stroll || {[Op.or] : [0,1]} },
      //   {horse_age: { [Op.between]: [ minHorseAge , maxHorseAge ]} },
      //   {horse_character: { [Op.like]: '%'+ req.query.character}},
      //   {horse_body_type :{ [Op.like]: '%'+ req.query.type}},
      //   {horse_height  : { [Op.between]: [ min , max ]}},
      //   {horse_age: { [Op.between]: [ minHorseAge , maxHorseAge ]}},
      //   {owner_age: { [Op.between]: [ minOwnerAge , maxOwnerAge ]}},
      //   {owner_caracter: { [Op.like]: '%'+ req.query.ownercaracter}},
      //   {owner_communication_frequency:   {[Op.like]:req.query.communication}},
      //   {horse_fixed_day: req.query.fixed || {[Op.or] : [0,1]} },
      //   // {owner_horse_work: req.query.work},
      //   {horse_location_type:{ [Op.like]: '%'+req.query.loctype}},
      //   {horse_accomodation: { [Op.like]: '%'+req.query.accomodation}},
      //   {horse_coaching_here :req.query.coachhere || {[Op.or] : [0,1]} },
      //   {horse_external_coach: req.query.coachext || {[Op.or] : [0,1]} },
      //   {horse_rider_need_own_saddle: req.query.material || {[Op.or] : [0,1]} },
      //   // {horse_competition_preferences : req.query.competition},

      // ], 

      
      
      
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

  let lat = parseFloat(req.body.horse_lat) || 1;
  let lng = parseFloat(req.body.horse_long) || 2 ;

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