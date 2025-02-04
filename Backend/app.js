require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const routesItems = require('./routes/routeItems.js');
const routesUsers = require('./routes/routesUsers.js');
const routesAuth = require('./routes/routesAuth.js');
const routesCandles = require('./routes/routesCandles.js');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const corsOptions = {
  // origin: 'http://127.0.0.1:8080',
  // origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  origin: '*',
  // origin: 'http://127.0.0.1:3000',
  credentials: true, // Permet l'envoi des cookies JWT
};
const mongoUri = process.env.MONGODB_URI;
mongoose
  .connect(mongoUri)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', routesAuth);
app.use('/api/items', routesItems);
app.use('/api/users', routesUsers);
app.use('/api/candles', routesCandles);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
