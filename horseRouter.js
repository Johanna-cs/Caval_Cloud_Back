const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/horse/search', (req, res) => {
   connection.query('SELECT name from horse', (err, results) =>{
  if (err) {
 
    // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
    res.status(500).send('Erreur lors de la récupération des noms des chevaux');
  } else {
 
    // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
    res.json(results);
  }
 });
});

app.post('/horses/add', (req, res) => {
 
  const formData = req.body;
 
  connection.query('INSERT INTO horse SET ?', formData, (err, results) => {
 
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde de l'annonce");
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
  