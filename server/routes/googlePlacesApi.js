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
const TIME_CONSTRAINT = 'TIME_CONSTRAINT'; // constant to check whether search will be affected by a time constraint

// Specific defaults for Google Places Detail Search
const BASE_DETAIL_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';
const DEFAULT_FIELDS = 'opening_hours,website,price_level'

// Specific defaults for Google Places Photo Search
const BASE_PHOTO_URL ='https://maps.googleapis.com/maps/api/place/photo?';
const DEFAULT_MAX_WIDTH = '350';

// Specific defaults for Google Distance Matrix Search
const BASE_DISTANCE_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

const resultNotFoundError = (message) => {
  return {
    name: 'ResultNotFound Error',
    message: message
  };
}

const getBaseSearchParams = (location, radius, keyword, price) => {
  let params = {
    location: location,
    radius: radius, 
    type: TYPE,
    opennow: true,
  };

  if (price > -1) {
    params.minprice = price;
    params.maxprice = price;
  }

  if (keyword !== TIME_CONSTRAINT) {
    params.keyword = keyword;
  }
  params.key = API_KEY;
  return {
    params: params
  };
}

const getRandomFromArray = (arr) => {
  let min = 0;
  let max = arr.length;
  return arr[Math.floor(Math.random() * (max - min + 1) + min)];
};

const sortByRating = (rating, results) => {
  let sortedResults = [];
  if (rating && rating !== -1) {
    sortedResults = results.filter(restaurant => {
      return (rating > -1) ? parseInt(restaurant.rating, 10) >= rating : true;
    });
  } else {
    sortedResults = results;
  }
  return sortedResults;
};

const checkForNoRestaurants = (list, func) => {
  if (!Array.isArray(list) || !list.length) {
    throw resultNotFoundError('@ ' + func + ': No Restaurants Found');
  }
}

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

const getPlaceDetailedInfo = (restaurant) => {
  let apiArray = [getPlaceDetail(restaurant)];
  if (restaurant.photos) {
    apiArray.push(getPlacePhoto(restaurant.photos[0]));
  }
  return axios.all(apiArray);
}

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

const getManyPlacesDistance = (restaurantList, location, mode) => {
  const apiArray = restaurantList.map(restaurant => {
    // console.log(restaurant);
    return getPlaceDistance(restaurant, location, mode);
  });
  // console.log(apiArray);
  return axios.all(apiArray);
}

const combineAndOrSortByTravelDuration = (keyword, restaurantList, distanceList, travelDuration) => {
  let combineList = [];
  if (travelDuration > -1) {
    const timeConstraint = (travelDuration === 0) ? 360 : 960;
    for (let i = 0; i < restaurantList.length; i++) {
      const tempDistanceList = distanceList[i].data.rows[0]
      // console.log('combine loop')
      // console.log(restaurantList[i].name + ' ' + restaurantList[i].place_id);
      // console.log(distanceList[i].config.params.destinations);
      // console.log(tempDistanceList.elements[0].duration.value);
      if (parseInt(tempDistanceList.elements[0].duration.value) <= timeConstraint) {
              // console.log('added ' + restaurantList[i].name);
        combineList.push({
          id: restaurantList[i].id,
          name: restaurantList[i].name,
          place_id: restaurantList[i].place_id,
          photos: restaurantList[i].photos,
          rating: restaurantList[i].rating,
          cuisine: null,
          price_level: restaurantList[i].price_level,
          distance: tempDistanceList.elements[0].distance,
          duration: tempDistanceList.elements[0].duration
        });
      }
    }
  } else {
    combineList.push({
      id: restaurantList[0].id,
      name: restaurantList[0].name,
      place_id: restaurantList[0].place_id,
      photos: restaurantList[0].photos,
      rating: restaurantList[0].rating,
      cuisine: keyword,
      price_level: restaurantList[0].price_level,
      distance: distanceList[0].data.rows ? distanceList[0].data.rows[0].elements[0].distance : null,
      duration: distanceList[0].data.rows ? distanceList[0].data.rows[0].elements[0].duration : null
    });
  }

  return combineList;
}

router.get('/surprise_me', function(req, res, next) {
  // Distance Matrix fields
  const travelDuration = parseInt(req.query.travelDuration);
  const travelMode = req.query.travelMode;

  // init google api get request
  const location = (req.query.location) ? req.query.location : DEFAULT_LOCATION; // change this before launch, cannot support default location
  const radius = (req.query.radius) ? parseInt(req.query.radius) : DEFAULT_RADIUS;
  // const keyword = (req.query.keyword) ? req.query.keyword : getRandomFromArray(CUISINE_LIST);
  const keyword = (travelDuration > -1) ? 'TIME_CONSTRAINT' : getRandomFromArray(CUISINE_LIST);
  console.log(keyword);

  // sorting, if any of the below has a value of -1, then it is irrelevant in sorting
  const rating = parseInt(req.query.rating);
  const price = parseInt(req.query.price);

  // add min/maxprice params as price if price != -1. else do
  let randomRestaurant;
  let restaurantList;
  axios.get(BASE_NEARBY_SEARCH_URL, getBaseSearchParams(location, radius, keyword, price))
    .then((response) => {
      const responseList = response.data.results;
      // console.log(responseList);
      checkForNoRestaurants(responseList, 'Initial Get Request');
      
      // mandatory rating sort of result list
      let resultList = sortByRating(rating, responseList);
      checkForNoRestaurants(resultList, 'Sort By Rating');

      // we limit results to 25 as anymore would be unnecessary and cause performance issues
      resultList.length = resultList.length > 25 ? 25 : resultList.length;

      restaurantList = (keyword === TIME_CONSTRAINT)
                        ? resultList : [getRandomFromArray(resultList)];
      return getManyPlacesDistance(restaurantList, location, travelMode);
    })
    .then((distanceList) => {
      // console.log(distanceList);
      restaurantList = combineAndOrSortByTravelDuration(keyword, restaurantList, distanceList, travelDuration);
      checkForNoRestaurants(restaurantList, 'Combine and Sort By Travel Duration');
      randomRestaurant = (keyword === TIME_CONSTRAINT) 
                          ? getRandomFromArray(restaurantList) : restaurantList[0];
      return getPlaceDetailedInfo(randomRestaurant);
    }) 
    .then((results) => {
      randomRestaurant.opening_hours = results[0].data.result.opening_hours;
      randomRestaurant.website = results[0].data.result.website;
      // has found photo
      if (results.length > 1) {
        // console.log('multiple api calls complete');
        // randomRestaurant.photo = results[1].data;
      }
      res.send(randomRestaurant);
    })
    .catch((error) => {
        console.log(error.name + ': ' + error.message);
        if (error.name === 'ResultNotFound Error') {
          res.status(404).send('No restaurants found');
        }
    });
});

module.exports = router;