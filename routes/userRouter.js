const express = require('express');
const app = express();
const userRouter = express.Router();
const models = require('../models'); 


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

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
const newData = {
  user_firstname: "hello"
}

userRouter.put('/:id', (req,res) => {
  models
    .User
    .update( newData ,{
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

module.exports = userRouter