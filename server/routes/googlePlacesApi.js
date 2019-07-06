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

// Specific defaults for Google Places Photo Search
const BASE_PHOTO_URL ='https://maps.googleapis.com/maps/api/place/photo?';
const DEFAULT_MAX_WIDTH = '350';

// Specific defaults for Google Distance Matrix Search
const BASE_DISTANCE_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';


const getRandomFromArray = (arr) => {
  let min = 0;
  let max = arr.length;
  return arr[Math.floor(Math.random() * (max - min + 1) + min)];
};

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
};

const getPlaceDetail = (restaurant) => {
  return axios.get(BASE_DETAIL_URL, {
    params: {
      placeid: restaurant.place_id,
      fields: DEFAULT_FIELDS,
      key: API_KEY
    }
  });
};

const getPlacePhoto = (restaurantPhoto) => {
  return axios.get(BASE_PHOTO_URL, {
    params: {
      photoreference: restaurantPhoto.photo_reference,
      maxwidth: DEFAULT_MAX_WIDTH,
      key: API_KEY
    }
  });
};

const getPlaceDistance = (restaurant, location, mode) => {
  return axios.get(BASE_DISTANCE_URL, {
    params: {
      origins: location,
      destinations: 'place_id:' + restaurant.place_id,
      mode: mode,
      key: API_KEY
    }
  });
};

const getPlaceDetailedInfo = (restaurant, location, mode) => {
  let apiArray = [getPlaceDetail(restaurant)];
  if (restaurant.photos) {
    apiArray.push(getPlacePhoto(restaurant.photos[0]));
  }
  apiArray.push(getPlaceDistance(restaurant, location, mode));
  return axios.all(apiArray);
}

//travelDuration does not matter
router.get('/', function(req, res, next) { // 'surprise_me'
  // init google api get request
  const location = (req.query.location) ? req.query.location : DEFAULT_LOCATION; // change this before launch, cannot support default location
  const radius = (req.query.radius) ? req.query.radius : DEFAULT_RADIUS;
  const keyword = (req.query.keyword) ? req.query.keyword : getRandomFromArray(CUISINE_LIST);

  // sorting, if any of the below has a value of -1, then it is irrelevant in sorting
  const rating = req.query.rating;
  const price = req.query.price;

  // Distance Matrix fields
  const travelDuration = req.query.travelDuration;
  const travelMode = 'driving'; // req.query.travelMode;

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
        return getPlaceDetailedInfo(randomRestaurant, location, travelMode,);
        
    })
    .then((results) => {
      if (results.length > 1) {
        console.log('multiple api calls complete');
        res.send({
          id: randomRestaurant.id,
          name: randomRestaurant.name,
          rating: randomRestaurant.rating,
          cuisine: keyword,
          price_level: randomRestaurant.price_level ? randomRestaurant.price_level : results[0].data.result.price_level,
          opening_hours: results[0].data.result.opening_hours,
          website: results[0].data.result.website,
          //photo: results[1].data,
          distance: results[2].data.rows[0].elements[0].distance,
          duration: results[2].data.rows[0].elements[0].duration
        });
      } else {
        console.log('no photos');
        res.send({
          id: randomRestaurant.id,
          name: randomRestaurant.name,
          rating: randomRestaurant.rating,
          cuisine: keyword,
          price_level: randomRestaurant.price_level ? randomRestaurant.price_level : results[0].data.result.price_level,
          opening_hours: results[0].data.result.opening_hours,
          website: results[0].data.result.website
        });
      }
    })
    .catch((error) => {
        console.log(error);
        if (error.name === 'no_restaurants') {
          res.status(404).send({error: 'No restaurants found!'});
        }
        
    });
});

module.exports = router;