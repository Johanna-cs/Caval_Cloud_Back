const express = require('express');
const app = express();
const port = 3000;
const userRouter = require('./routes/userRouter');
const riderRouter = require('./routes/riderRouter')
const horseRouter = require('./routes/horseRouter')
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/', (req, res) => {
  res.send('home')
})

// Utilisation des différents routers selon les routes définies ci-dessous :
app.use('/users', userRouter)
app.use('/riders', riderRouter)
app.use('/horses', horseRouter)


app.listen(port, (err) => {
  if (err) {
      throw new Error (err) }
  else {
      console.log("server is running")
  }
})
