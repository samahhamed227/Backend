"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(cors());


//start
class Forecast {
  constructor(description, date) {
    this.description = description;
    this.date = date;
   
  }
}


class Movies {
  constructor(element) {
    this.title = element.title;
    this.overview = element.overview;
    this.vote = element.vote;
    this.count = element.count;
    this.img =element. img;
    this.popularity=element.popularity;
    this.release_date=element.release_date;
  }
}

app.get("/", function (request, response) {
  response.send(
    "you are in the home"
  );
});

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get("/weather", async (request, response) => {
 
  const city_name = request.query.city;
  
  const link = "https://api.weatherbit.io/v2.0/forecast/daily";
  const linkResponse = await axios.get(
    `${link}?city=${city_name}&key=${WEATHER_API_KEY}`
  );

  

  if (city_name) {
   
    let weatherAraay = linkResponse.data.data.map((item) => {
      
      return new Forecast( item.weather.description, item.datetime    );
    });

    if (weatherAraay.length) {
      response.json(weatherAraay);
     
    } else {
      response.send("No data.");
    }
  } else {
    response.json("Error");
  }
});

const MOVIES_API_KEY = process.env.MOVIE_key;

app.get("/movies", async (request, response) => {
 
  const city_name = request.query.query;

  const link = "https://api.themoviedb.org/3/search/movie";
  const linkResponse = await axios.get(
    `${link}?query=${city_name}&api_key=${MOVIES_API_KEY}`
  );

  if (city_name) {
    
    let movieArray = linkResponse.data.results.map((item) => {
     
      return new Movies(item  );
    });

    if (movieArray.length) {
      response.json(movieArray);
    } else {
      response.send("No data.");
    }
  } else {
    response.json("Error");
  }
});

let port = process.env.PORT || 3003;
app.listen(port, () => {});