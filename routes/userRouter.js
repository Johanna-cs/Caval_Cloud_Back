const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const models = require('../models')
users.use(cors())

process.env.SECRET_KEY = 'secret'


// creer un compte register
users.post('/register', (req, res) => {
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

// se connecter login 

users.post('/login', (req, res) => {
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
users.get('/profile', (req, res) => {
  const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
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
users.get('/', (req,res) => {
  models
    .User
    .findAll({include:[models.Rider]})
    .then(x => res.json(x))

  }
)

// Delete user from its ID
users.delete('/:id', (req,res) => {
  models
    .User
    .destroy({
      where: {
        user_ID : req.params.id
      }
    })
    .then(res.send("user deleted"))
});

module.exports = users