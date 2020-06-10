const express = require('express');
const app = express();
const port = 3000;
const riderRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/rider/search', (req, res) => {
    connection.query('SELECT name from rider', (err, results) =>{
   if (err) {
  
     // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
     res.status(500).send('Erreur lors de la récupération des noms des cavaliers');
   } else {
  
     // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
     res.json(results);
   }
  });
 });


 app.post('/rider/add', (req, res) => {
 
    const formData = req.body;
   
    connection.query('INSERT INTO rider SET ?', formData, (err, results) => {
   
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde de l'annonce cavalier");
      } else {
        res.sendStatus(200);
      }
    });
  });

server.listen(port, (err) => {
    if (err) {
      console.error('Something bad happened');
    } else {
      console.log(`server is listening on ${port}`);
    }
  });
  