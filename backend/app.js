const express = require('express');
const cors = require('cors');
const bikeRoutes = require('./routes/bikeRoutes');

const app = express();

app.use(express.json());

// ROUTES

app.use('/rentBike', bikeRoutes);

module.exports = app;
