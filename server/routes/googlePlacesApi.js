var express = require('express');
var axios = require('axios');
require('dotenv').config();
var router = express.Router();

// General defaults for all Google Searchs
const API_KEY = process.env.GOOGLE_API_KEY;
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

// Specific defaults for Google Places Nearby Search
const BASE_NEARBY_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const DEFAULT_LOCATION = '40.029832231894524,-83.01501735712759';
const DEFAULT_RADIUS = '2500';
const TYPE = 'restaurant';

// Specific defaults for Google Places Detail Search
const BASE_DETAIL_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';
const DEFAULT_FIELDS = 'opening_hours,website,price_level'

const getRandomFromArray = (arr) => {
  let min = 0;
  let max = arr.length;
  return arr[Math.floor(Math.random() * (max - min + 1) + min)];
}

const sortByPriceAndRating = (price, rating, results) => {
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

//travelDuration does not matter
router.get('/', function(req, res, next) { // 'surprise_me'
  //init google api get request
  const location = (req.query.location) ? req.query.location : DEFAULT_LOCATION; // change this before launch, cannot support default location
  const radius = (req.query.radius) ? req.query.radius : DEFAULT_RADIUS;
  const keyword = (req.query.keyword) ? req.query.keyword : getRandomFromArray(CUISINE_LIST);

  //sorting, if any of the below has a value of -1, then it is irrelevant in sorting
  const rating = req.query.rating;
  const price = req.query.price;
  // const travelDuration = req.query.travelDuration;

  // add min/max price as price if price != -1. else do
  let randomRestaurant;
  axios.get(BASE_NEARBY_SEARCH_URL, {
      params: {
        location: location,
        radius: radius,
        keyword: keyword, 
        type: TYPE,
        opennow: true,
        key: API_KEY
      }
    })
    .then((response) => {
        const resultList = sortByPriceAndRating(parseInt(price, 10), parseInt(rating, 10), response.data.results);
        if (!Array.isArray(resultList) || !resultList.length) {
          throw new Error('no_restaurants');
        }
        randomRestaurant = getRandomFromArray(resultList);
        // console.log(randomRestaurant);
        // console.log(randomRestaurant.place_id);
        return axios.get(BASE_DETAIL_URL, {
          params: {
            placeid: randomRestaurant.place_id,
            fields: DEFAULT_FIELDS,
            key: API_KEY
          }
        });
    })
    .then((response) => {
        res.send({
          id: randomRestaurant.id,
          name: randomRestaurant.name,
          rating: randomRestaurant.rating,
          price_level: randomRestaurant.price_level ? randomRestaurant.price_level : response.data.result.price_level,
          opening_hours: response.data.result.opening_hours,
          website: response.data.result.website
        });
    })
    .catch((error) => {
        console.log(error);
        if (error.name === 'no_restaurants') {
          res.status(404).send({error: 'No restaurants found!'});
        }
        
    });
});

module.exports = router;