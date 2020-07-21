const express = require('express')
const userRouter = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const models = require('../models')
userRouter.use(cors())

process.env.SECRET_KEY = 'secret'


// creer un compte register
userRouter.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        user_firstname: req.body.user_firstname,
        user_lastname: req.body.user_lastname,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        createdAt: today
    }
    models
        .User
        .findOne({
            where: {
              user_email: req.body.user_email
            }
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.user_password, 10, (err, hash) => {
                    userData.user_password = hash
                    models
                    .User
                    .create(userData)
                        .then(user => {
                            res.json({ status: user.user_email + ' registered' })
                        })
                        .catch(err => res.status(400).send(err))
                })
            }
            else {
                res.json({ error: "User already exist" })
            }
        })
        .catch(err => res.send(err))
})
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
})
// se connecter login 

userRouter.post('/login', (req, res) => {
  models
  .User.findOne({
    where: {
      user_email: req.body.user_email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.user_password, user.user_password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      } else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
})

// profil
userRouter.get('/profile', (req, res) => {
  const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    .User
    .create(req.body)
    .then(x => res.json(x))
});

// Update user information from its ID
userRouter.put('/:id', (req,res) => {
  models
  .User
  .findOne({
    where: {
      user_ID: decoded.user_ID
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// Display all users :
userRouter.get('/', (req,res) => {
  models
    .User
    .findAll({include:[models.Rider]})
    .then(x => res.json(x))

  }
)

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

module.exports= userRouter
