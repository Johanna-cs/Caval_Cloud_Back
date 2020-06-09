const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const connection = require('./conf');
const userRouter = require('./userRouter');
const horseRouter = require('./horseRouter')
const riderRouter = require('./riderRouter')
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


router.get('/', (req,res,next)=> {
  if (isConnected()){
    return next();
  } esle ;{
    return res.redirect('/login');
  }
}, (req, res, next) => {
  res.json({});
});









app.post('/user/register', (req,res ))

app.get('/user/login', (req,res))


app.get(`/user/profile`, (req, res) => {
  res.json({user});
});

app.get('/horse/search', (req, res) => {
    res.json({horses}  );
});

app.post('/horse/add', (req, res) => {
});

app.get('/rider/search', (req, res) => {
    res.json({riders}  );
});

app.post('/rider/add', (req, res) => {

});

server.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`server is listening on ${port}`);
  }
});
