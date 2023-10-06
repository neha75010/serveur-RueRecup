const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le body des requêtes POST
app.use(cors());
app.use(bodyParser.json());

// Configurez la connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Connectez-vous à la base de données
connection.connect((error) => {
  if (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Créez une route pour ajouter un user
app.post('/add-user', (req, res) => {
  console.log("🚀 ~ file: index.js:38 ~ app.post ~ req:", req)
  const { First_Name, Last_Name, Email, User_Adress, Password } = req.body;
  
  const sql = 'INSERT INTO user (First Name, Last Name, Email, User_Adress, Password) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [First_Name, Last_Name, Email, User_Adress, Password], (error, results) => {
    if (error) {
      console.error('Erreur d\'insertion:', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }
    res.status(201).send(`User ajouté avec l'ID: ${results.insertId}`);
  });
});

// Créez une route pour récupérer tous les types de users
app.get('/get-users', (req, res) => {
  console.log("🚀 ~ file: index.js:53 ~ app.get ~ req:", req)
  const sql = 'SELECT * FROM user';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Erreur de récupération:', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }
    res.status(200).json(results);
  });
});

// Créez une route pour ajouter un user
app.post('/add-adress', (req, res) => {
  console.log("🚀 ~ file: index.js:38 ~ app.post ~ req:", req)
  const { Street, District } = req.body;
  
  const sql = 'INSERT INTO adress (Street, District ) VALUES (?, ?)';
  connection.query(sql, [Street, District ], (error, results) => {
    if (error) {
      console.error('Erreur d\'insertion:', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }
    res.status(201).send(`User ajouté avec l'ID: ${results.insertId}`);
  });
});

// Créez une route pour récupérer toutes les adresses
app.get('/get-adresses', (req, res) => {
  console.log("🚀 ~ file: index.js:53 ~ app.get ~ req:", req)
  const sql = 'SELECT * FROM adress';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Erreur de récupération:', error);
      res.status(500).send('Erreur interne du serveur');
      return;
    }
    res.status(200).json(results);
  });
});

// Faites écouter le serveur sur le port spécifié
app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`);
});

// // Définissez vos points de terminaison REST et traitez les requêtes pour interagir avec la base de données.

// app.listen(port, () => {
//   console.log(`Serveur REST écoutant sur le port ${port}`);
// });

// app.get('/user', (req, res) => {
//   // Exécutez une requête SQL pour récupérer toutes les user
//   const query = 'SELECT * FROM user';
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Erreur lors de la récupération des user :', err);
//       res.status(500).send('Erreur lors de la récupération des user.');
//     } else {
//       res.json(results);
//     }
//   });
// });