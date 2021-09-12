
'use strict';
const Movies = require('../modules/movie.modal');
const axios=require('axios');
require('dotenv').config();


const MOVIES_API_KEY = process.env.MOVIE_key;

const getMovie =  async (request, response) => {
 
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
}
module.exports = getMovie;
