var express = require('express');
var axios = require('axios');
require('dotenv').config();
var router = express.Router();

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const API_KEY = process.env.GOOGLE_API_KEY;
const DEFAULT_LOCATION = '40.029832231894524,-83.01501735712759';
const DEFAULT_RADIUS = '2500';
const TYPE = 'restaurant';
const DEFAULT_SEARCH_TYPE = 'SURPRISE';

const CUISINE_LIST = [
  'Japanese',
  'Korean',
  'Indian',
  'Chinese',
  'Thai',
  'Mexican',
  'Italian',
  'Vietnamese',
  'Burgers',
  'Pizza',
  'Wings',
  'BBQ'
];

function getRandomCuisine() {
  let min = 0;
  let max = CUISINE_LIST.length;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sortByPriceAndRating(price, rating, results) {
  let sortedResults = [];
  if ((rating && price) && !(rating === -1 && price === -1)) {
    sortedResults = results.filter(restaurant => {
      return ((price > -1) ? parseInt(restaurant.price_level, 10) === price : true)
        && ((rating > -1) ? parseInt(restaurant.rating, 10) >= rating : true);
    });
  } else {
    sortedResults = results;
  }
  return sortedResults;
}

router.get('/', function(req, res, next) {
  //init google api get request
  const location = (req.query.location) ? req.query.location : DEFAULT_LOCATION;
  const radius = (req.query.radius) ? req.query.radius : DEFAULT_RADIUS;
  const search = (req.query.search_type) ? req.query.search_typ : DEFAULT_SEARCH_TYPE;

  //sorting
  const rating = req.query.rating;
  const price = req.query.price;

  let keyword = req.query.keyword;

  if (!keyword || search === 'DEFAULT_SEARCH_TYPE') {
    keyword = getRandomCuisine();
  }   
  axios.get(BASE_URL, {
      params: {
        location: location,
        radius: radius,
        keyword: keyword, 
        type: TYPE,
        opennow: true,
        key: API_KEY
      }
    })
    .then(function (response) {
        //console.log(response.data.results);
        res.send(sortByPriceAndRating(parseInt(price, 10), parseInt(rating, 10), response.data.results));
    })
    .catch(function(error) {
        console.log(error);
    })
});

module.exports = router;