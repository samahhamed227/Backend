"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
let PORT = process.env.PORT ;
app.use(cors());


//start



const index = require('./controller/index.controller');

const getWeather = require('./controller/weather.controller');

const getMovie = require('./controller/movie.controller');
app.get('/', index);
app.get('/weather', getWeather);
app.get('/movies', getMovie);


app.listen(PORT, () => {});