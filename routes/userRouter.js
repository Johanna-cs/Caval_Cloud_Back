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
        user_accept_CGV :req.body.user_accept_CGV,
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
// userRouter.put('/:id', (req,res) => {
//   models
//   .User
//   .findOne({
//     where: {
//       // user_ID: decoded.user_ID
//       user_ID : req.params.id
//     }
//   })
//   .then(x => res.json(x))

//     // .then(user => {
//     //   if (user) {
//     //     res.json(user)
//     //   } else {
//     //     res.send('User does not exist')
//     //   }
//     // })
//     // .catch(err => {
//     //   res.send('error: ' + err)
//     // })
// })

// Display all users :
userRouter.get('/', (req,res) => {
  models
    .User
    .findAll({include:[models.Rider]})
    .then(x => res.json(x))

  }
)

// Update user information from its ID (V2):

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
  const userid = req.body.userid
  const horseid = Number(req.body.horseid)
  const horsename = req.body.horsename
  const urlphoto = req.body.urlphoto
  models
    .FavoriteHorses
    .create({
      userid: userid,
      horseid: horseid,
      horsename : horsename,
      urlphoto : urlphoto,
    })
    .then(res.send(`a new favorite horse has been added`))
  models
    .Horse
    .update(
      { UserUserID : userid },
      { where: {
          horse_ID: horseid
      }}
  )
});

// Delete horse within user favorite from its ID
userRouter.delete('/deleteFavoriteHorse/:id', (req,res) => {
  models
    .FavoriteHorses
    .destroy({
      where: {
        userid : req.params.id
      }
    })
    .then(res.send("horse favorite deleted"))
});


// Display horse favorites from userID: 
userRouter.get('/favorites/horses/:id', (req,res) => {
  models
    .FavoriteHorses
    .findAll(
      {
      where: {
        userid : req.params.id
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




module.exports= userRouter
