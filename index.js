const express = require('express');
const models = require('./models')
const app = express(); 
const port = 4000;
const userRouter = require('./routes/userRouter');
const riderRouter = require('./routes/riderRouter');
const horseRouter = require('./routes/horseRouter');


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

