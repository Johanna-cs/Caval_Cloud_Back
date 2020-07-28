const express = require('express');
const app = express();
const ownerRouter = express.Router();
const models = require('../models'); 


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// display all owner :

ownerRouter.get('/', (req,res) => {
    models
      .Owner_presentation
      .findAll({include : [models.Horse]})
      .then(x => res.json(x))
  });


  //{include: [{
  // association : [Horse.OwnerPresentationOwnerID], 
  // include : [models.Horse] }]}

    
  // Create a owner :

ownerRouter.post('/', (req,res) => {
  models
    .Owner_presentation
    .create(req.body, {
      where: {
        owner_ID: req.params.id
      }})
    .then(x => res.json(x))
});


// Update owner information from its ID :

ownerRouter.put('/:id', (req,res) => {
  models
    .Owner_presentation
    .update(req.body, {
      where: {
          Owner_ID: req.params.id
      }
  })
    .then(x => res.json(x))
});


// Delete a Owner from its ID :

ownerRouter.delete('/:id', (req,res) => {
  models
    .Owner_presentation
    .destroy({
      where: {
        Owner_ID : req.params.id
      }
    })
    .then(res.send("Owner deleted"))
});

module.exports = ownerRouter
