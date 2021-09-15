'use strict';
const Movies = require('../modules/movie.modal');
const axios=require('axios');
require('dotenv').config();
const Cache = require("../Cashe/cache");
let cacheObject = new Cache();

const MOVIES_API_KEY = process.env.MOVIE_key;

const getMovie =  async (request, response) => {
 
  const city_name = request.query.query;



  const shutTime = 65465;
  const time = (Date.now() - cacheObject.timeStamp) > shutTime;
  if (time) {
   
    cacheObject = new Cache();
  }


  const newData = cacheObject.movies.find(
    (item) => item.city_name === city_name
  );
  if (newData) {
    response.json(newData.data);
  } else {




  const link = "https://api.themoviedb.org/3/search/movie";
  const linkResponse = await axios.get(
    `${link}?query=${city_name}&api_key=${MOVIES_API_KEY}`
  );

  if (city_name) {
    
    let movieArray = linkResponse.data.results.map((item) => {
     
      return new Movies(item  );
    });

    cacheObject.movies.push({
      city_name: city_name,
      data: movieArray,
    });



    if (movieArray.length) {
      response.json(movieArray);
    } else {
      response.send("No data.");
    }
  } else {
    response.json("Error");
  }
}}
module.exports = getMovie;
