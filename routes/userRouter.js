const express = require('express')
const userRouter = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const jwtUtils = require('../utils/jwt-utils')
const bcrypt = require('bcryptjs')
const models = require('../models')

userRouter.use(cors())

process.env.SECRET_KEY = 'secret'


// REGISTER 
userRouter.post('/register', (req, res) => {
    
  // Params
  let user_firstname = req.body.user_firstname
  let user_lastname = req.body.user_lastname
  let user_email = req.body.user_email
  let user_password = req.body.user_password
  let user_accept_CGV = req.body.user_accept_CGV
    
  if (user_email == null || user_lastname == null || user_password == null || user_accept_CGV == null){
    return res.status(400).json({ 'error' : 'missing parameters'})
  }

  // TODO verify pseudo length, mail regex, password :

    models.User
        .findOne({
          attributes : ['user_email'],
          where: { user_email: user_email}
        })
        .then(user => {
            if (!user) {
                bcrypt.hash(user_password, 10, (err, hash) => {
                  let newUser = models.User.create({
                    user_firstname : user_firstname,
                    user_lastname : user_lastname,
                    user_email : user_email,
                    user_password : hash,
                    user_accept_CGV,
                    user_isAdmin : 0     
                  })
                .then(newUser => res.status(201).json({newUser}))
                .catch(err => res.status(500).json({ 'error' : 'cannot add user' }))
              })  
            } else {
                res.status(409).json({ 'error' : 'user already exist' })
            }
        })
        .catch(err => res.status(500).json('error : unable to verify user'))
})

// LOGIN
userRouter.post('/login', (req, res) => {

  // Params
  let user_email = req.body.user_email
  let user_password = req.body.user_password

  if (user_email == null ||  user_password == null) {
    return res.status(400).json({ 'error': 'missing parameters' });
  }

  // TODO verify pseudo length, mail regex, password :

  models.User
  .findOne({
    where: { user_email: user_email}
  })
  .then(userFound => {
      if (userFound) {
        bcrypt.compare(user_password, userFound.user_password, (errHash, resHash) => {
          if (resHash) {
            res.status(200).json({
              'user_ID' : userFound.user_ID,
              'token' : jwtUtils.generateTokenForUser(userFound)
            })
          } else {
            res.status(403).json({"error" : "invalid password"})
          }
        }) 
      } else {
        res.status(404).json({ 'error': 'user does not exist in database' })
      }
  }) 
  .catch(err => {
      res.status(500).json({ 'error' : 'unable to verify user' })
  })
})
// MY PROFILE 
userRouter.get('/profile', (req, res) => {
  const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
      where : {
        user_ID: decoded.user_ID
      }
    })
    .then( user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error : ' + err)
    })
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

// Display one user from its email: 
userRouter.get('/:email', (req,res) => {
  models
    .User
    .findOne({
      where: {
        user_email : req.params.user_email
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


// Display all users :
userRouter.get('/', (req,res) => {
  models
    .User
    .findAll({include:[models.Rider]})
    .then(x => res.json(x))

  }
)

// Update user information from its ID :

userRouter.put('/:id', (req, res) => {
  models
      .User
      .update(req.body, {
          where: {
              user_ID: req.params.id
          }
      })
      .then(x => res.json(x))
    })



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


// Add a horse within user favorites
userRouter.post('/addFavoriteHorse', (req,res) => {
  const user_ID = req.body.user_ID
  const horse_ID = Number(req.body.horse_ID)
  const horse_name = req.body.horse_name
  const horse_photo1 = req.body.horse_photo1
  models
    .FavoriteHorses
    .create({
      user_ID: user_ID,
      horse_ID: horse_ID,
      horse_name : horse_name,
      horse_photo1 : horse_photo1,
    })
    .then(res.send(`a new favorite horse has been added`))

});

// Add a rider within user favorites
userRouter.post('/addFavoriteRider', (req,res) => {
  const user_ID = req.body.user_ID
  const rider_ID = Number(req.body.rider_ID)
  const rider_firstname = req.body.rider_firstname
  const rider_photo1 = req.body.rider_photo1
  models
    .FavoriteRiders
    .create({
      user_ID: user_ID,
      rider_ID: rider_ID,
      rider_firstname : rider_firstname,
      rider_photo1 : rider_photo1,
    })
    .then(res.send(`a new favorite rider has been added`))

});

// Delete horse within user favorite from its ID
userRouter.delete('/deleteFavoriteHorse/:id', (req,res) => {
  models
    .FavoriteHorses
    .destroy({
      where: {
        user_ID : req.params.id
      }
    })
    .then(res.send("horse favorite deleted"))
});

// Delete rider within user favorite from its ID
userRouter.delete('/deleteFavoriteRider/:id', (req,res) => {
  models
    .FavoriteRiders
    .destroy({
      where: {
        user_ID : req.params.id
      }
    })
    .then(res.send("rider favorite deleted"))
});

// Display horse favorites from userID: 
userRouter.get('/favorites/horses/:id', (req,res) => {
  models
    .FavoriteHorses
    .findAll(
      {
      where: {
        user_ID : req.params.id
      },
      })
    .then(item => {
      if(item) {
        res.json(item)
        } else {
        res.json({message : 'No favorited horses'})
        }
    })
  })

  // Display rider favorites from userID: 
userRouter.get('/favorites/riders/:id', (req,res) => {
  models
    .FavoriteRiders
    .findAll(
      {
      where: {
        user_ID : req.params.id
      },
      })
    .then(item => {
      if(item) {
        res.json(item)
        } else {
        res.json({message : 'No favorited riders'})
        }
    })
  })



module.exports= userRouter
