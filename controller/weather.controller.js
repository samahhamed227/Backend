

const axios = require('axios');
require('dotenv').config();
const Forecast = require('../modules/weather.modal');
const Cache = require("../Cashe/cache");
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
let cacheObject = new Cache();


const getWeather =  async (request, response) => {
 
  const city_name = request.query.city;
  
  const timer = 30000;
  const time = (Date.now() - cacheObject.timeStamp) > timer;
  if (time) {
   
    cacheObject = new Cache();
  }

  const newData = cacheObject.forCast.find(
    (item) => item.city_name === city_name
  );
  if (newData) {
    response.json(newData.data);
  } else {


  const link = "https://api.weatherbit.io/v2.0/forecast/daily";
  const linkResponse = await axios.get(
    `${link}?city=${city_name}&key=${WEATHER_API_KEY}`
  );

  

  if (city_name) {
   
    let weatherAraay = linkResponse.data.data.map((item) => {
      
      return new Forecast( item.weather.description, item.datetime    );
    });



    cacheObject.forCast.push({
      city_name: city_name,
      data: weatherAraay,
    });




    if (weatherAraay.length) {
      response.json(weatherAraay);
     
    } else {
      response.send("No data.");
    }
  } else {
    response.json("Error");
  }
}}
module.exports = getWeather;
