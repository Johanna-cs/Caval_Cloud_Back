const express = require('express');
const app = express();
const riderRouter = express.Router();
const models = require('../models'); 


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//Affiche l'ensemble des riders :
riderRouter.get('/', (req,res) => {
  models
    .Rider
    .findAll()
    .then(x => res.json(x))

  }
)

// Créer un rider :
riderRouter.post('/', (req,res) => {
  models
    .Rider
    .create(req.body)
    .then(x => res.json(x))
});

// Update des infos rider 
riderRouter.put('/:id', (req,res) => {
  models
    .Rider
    .update({rider_firstname : 'Nadir'},{
      where: {
        rider_ID: req.params.id
      }
    })
    .then(x => res.json(x))
});

// delete d'un rider
riderRouter.delete('/:id', (req,res) => {
  models
    .Rider
    .destroy({
      where: {
        rider_ID : req.params.id
      }
    })
    .then(x => res.json(x))
});



module.exports = riderRouter