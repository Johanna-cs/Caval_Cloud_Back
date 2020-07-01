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
      .findAll()
      .then(x => res.json(x))
  });

  // Create a owner :

ownerRouter.post('/', (req,res) => {
  models
    .Owner_presentation
    .create(req.body)
    .then(x => res.json(x))
});


// Update owner information from its ID :

ownerRouter.put('/:id', (req,res) => {
  models
    .Owner_presentation
    .update(req.body, {
      where: {
          Owner_presentation_ID: req.params.id
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
        Owner_presentation_ID : req.params.id
      }
    })
    .then(res.send("Owner deleted"))
});

module.exports = ownerRouter