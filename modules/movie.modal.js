
'use strict';

class Movies {
    constructor(element) {
      this.title = element.title;
      this.overview = element.overview;
      this.vote = element.vote;
      this.count = element.count;
      this.popularity=element.popularity;
      this.release_date=element.release_date;
      this.img_url = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
  
    }
  }
  module.exports = Movies;
