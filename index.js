const express = require('express');
const models = require('./models')
const app = express(); 
const port = process.env.PORT;
const userRouter = require('./routes/userRouter');
const riderRouter = require('./routes/riderRouter');
const horseRouter = require('./routes/horseRouter');
require('dotenv').config()


const cors = require('cors');
const bodyParser =require('body-parser');
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



app.get('/', (req, res) => {
  res.send('home')
})

// Utilisation des différents routers selon les routes définies ci-dessous :
app.use('/api/users', userRouter)
app.use('/api/riders', riderRouter)
app.use('/api/horses', horseRouter)


models
.sequelize
.sync()
.then(() => app.listen(port, () => console.log(`App listening on port ${port}`)))

