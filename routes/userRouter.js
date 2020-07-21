const express = require('express');
const app = express();
const userRouter = express.Router();
const models = require('../models'); 


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Display one user from its ID: 
userRouter.get('/:id', (req,res) => {
  models
    .User
    .findOne({
      where: {
        user_ID : req.params.id
      }})
    .then(x => res.json(x))
})

// Display all users :
userRouter.get('/', (req,res) => {
  models
    .User
    .findAll({include:[models.Rider]})
    .then(x => res.json(x))

  }
)

// Create a new user
userRouter.post('/', (req,res) => {
  models
    .User
    .create(req.body)
    .then(x => res.json(x))
});

// Update user information from its ID
userRouter.put('/:id', (req,res) => {
  models
    .User
    .update(req.body ,{
      where: {
        user_ID: req.params.id
      }
    })
    .then(x => res.json(x))
});

// Delete user from its ID
userRouter.delete('/:id', (req,res) => {
  models
    .User
    .destroy({
      where: {
        user_ID : req.params.id
      }
    })
    .then(res.send("user deleted"))
});

// Add a result within user favorites
userRouter.post('/add-favorites/horse/:userId', (req,res) => {
  const userId = 1
  // const resultId = req.params.resultId
  models
    .favorites_horses
    .create({
        UserUserID : userId,
        // HorseHorseID : resultId
      })
    .then(res.send(`a new favorite for user ${userId} has been created`))
});

module.exports = userRouter