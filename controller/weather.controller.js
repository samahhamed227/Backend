
const axios = require('axios');
require('dotenv').config();
const Forecast = require('../modules/weather.modal');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;



const getWeather =  async (request, response) => {
 
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
}
module.exports = getWeather;
