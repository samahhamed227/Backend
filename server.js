"use strict";

const express = require("express");
const Server = express();
const cors = require("cors");
Server.use(cors());
const PORT = process.env.PORT;
const weather = require("./data/weather.json");
require("dotenv").config();

Server.get("/", function (req, res) {
  res.send("Hello World in the home");
});

class forecast {
  constructor(data, description) {
    this.data = date;
    this.description = description;
  }
}

Server.get("/get-weather", (req, res) => {
  console.log(req.query);
  const CityName = req.query.city_name;

  let searchquery = weather.find((item) => {
    return   (item.city_name === CityName) 

  });
  if (searchquery) {
    let newarray = searchquery.data.map((item) => {
      return new forecast(item.datetime, item.weather.description);
    });
    res.json(newarray);
  }

  console.log(searchquery);
});

Server.get("*", (require, response) => {
  response.send("not found");
});

Server.listen(PORT, () => {
  console.log(`Server started on port${PORT}`);
});
