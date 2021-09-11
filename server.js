"use strict";

const express = require("express");
const Server = express();
const cors = require("cors");
Server.use(cors());
const PORT = process.env.PORT || 3003;
const weather = require("./data/weather.json");
require("dotenv").config();

Server.get("/", function (req, res) {
  res.send("Hello World in the home");
});

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}
//http://localhost:3003/weather?city_name=amman
Server.get("/weather", (req, res) => {
  console.log(req.query);
  const cityName = req.query.city_name;



  if (cityName) {
    const returnArray = weather.find((item) => {
      return item.city_name.toLowerCase() === cityName;
    });
   
    let searchquery=returnArray.data.map((item) => {
     
      return new Forecast(item.datetime, item.weather.description);
    });
console.log(searchquery);
    
    if (searchquery.length) {
      res.json(searchquery);
    } else {
      res.send(" 404  error ");
    }
  } else {
    res.json(weather);
  }
});


Server.get("*", (require, res) => {
  res.send("not found");
});

Server.listen(PORT, () => {
  console.log(`Server started on port${PORT}`);
});











//   let searchquery = weather.find((item) => {
//     return   (item.city_name === CityName) 

//   });
//   if (searchquery) {
//     let newarray = searchquery.data.map((item) => {
//       return new Forecast(item.datetime, item.weather.description);
//     });
//     res.json(newarray);
//   }

//   console.log(searchquery);
// });

// Server.get("*", (require, res) => {
//   res.send("not found");
// });

// Server.listen(PORT, () => {
//   console.log(`Server started on port${PORT}`);
// });
