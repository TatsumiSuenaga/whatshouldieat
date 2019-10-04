var express = require('express');
var axios = require('axios');
require('dotenv').config();
var router = express.Router();
var constants = require('../shared/constants');
var utils = require('../shared/utils');

router.get('/surprise-me', function(req, res, next) {
  // Distance Matrix fields
  const travelDuration = parseInt(req.query.travelDuration);
  const travelMode = req.query.travelMode;

  // init google api get request
  const location = (req.query.location) ? req.query.location : constants.DEFAULT_LOCATION; // change this before launch, cannot support default location
  const radius = (req.query.radius) ? parseInt(req.query.radius) : constants.DEFAULT_RADIUS;

  // sorting, if any of the below has a value of -1, then it is irrelevant in sorting
  const rating = parseInt(req.query.rating);
  const price = parseInt(req.query.price);

  // add min/maxprice params as price if price != -1. else do
  let randomRestaurant;
  let restaurantList;
  axios.get(constants.BASE_NEARBY_SEARCH_URL, utils.getBaseSearchParams(location, radius, null, price))
    .then((response) => {
      const responseList = response.data.results;
      // console.log(responseList);
      utils.checkForNoRestaurants(responseList, 'Initial Get Request');
      
      // mandatory rating sort of result list
      let resultList = utils.filterByRating(rating, responseList);
      utils.checkForNoRestaurants(resultList, 'Sort By Rating');

      // we limit results to 25 as anymore would be unnecessary and cause performance issues
      resultList.length = resultList.length > 25 ? 25 : resultList.length;

      // If we have a time constraint, search the whole list, else get a random restaurant
      restaurantList = (travelDuration > -1)
                        ? resultList : [utils.getRandomFromArray(resultList)];
      return utils.getManyPlacesDistance(restaurantList, location, travelMode);
    })
    .then((distanceList) => {
      restaurantList = utils.combineAndOrSortByTravelDuration(null, restaurantList, distanceList, travelDuration);
      utils.checkForNoRestaurants(restaurantList, 'Combine and Sort By Travel Duration');
      randomRestaurant = (travelDuration > -1) 
                          ? utils.getRandomFromArray(restaurantList) : restaurantList[0];
      return utils.getManyPlacesDetailedInfo([randomRestaurant]);
    }) 
    .then((results) => {
      randomRestaurant.opening_hours = results[0].data ? results[0].data.result.opening_hours : null;
      randomRestaurant.website = results[0].data ? results[0].data.result.website : null;
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
        } else {
          res.status(500).send();
        }
    });
});

router.get('/user-input', async function(req, res, next) {
  try {
    // Distance Matrix fields
    // const travelDuration = parseInt(req.query.travelDuration);
    const travelMode = req.query.travelMode;

    // init google api get request
    const location = (req.query.location) ? req.query.location : constants.DEFAULT_LOCATION; // change this before launch, cannot support default location
    const radius = (req.query.radius) ? parseInt(req.query.radius) : constants.DEFAULT_RADIUS;
    // const keyword = (req.query.keyword) ? req.query.keyword : utils.getRandomFromArray(constants.CUISINE_LIST);
    const keywordList  = (req.query.keywordList) ? req.query.keywordList : null;
    console.log(keywordList);

    // sorting, if any of the below has a value of -1, then it is irrelevant in sorting
    const rating = parseInt(req.query.rating);
    const price = parseInt(req.query.price);
    const totalResults = await axios.all( keywordList.map( async keyword => {
      // add min/maxprice params as price if price != -1. else do
      let restaurantList = await axios.get(constants.BASE_NEARBY_SEARCH_URL, utils.getBaseSearchParams(location, radius, keyword, price));
      const responseList = restaurantList.data.results;
      // console.log('responseList');
      // console.log(responseList);
      utils.checkForNoRestaurants(responseList, 'Initial Get Request');
      
      // mandatory rating sort of result list
      let resultList = utils.filterByRating(rating, responseList);
      utils.checkForNoRestaurants(resultList, 'Sort By Rating');

      // we limit results to 5 as anymore would be unnecessary and cause performance issues
      resultList.length = resultList.length > 5 ? 5 : resultList.length;

      restaurantList = resultList;
      let distanceList = await utils.getManyPlacesDistance(restaurantList, location, travelMode);

      restaurantList = utils.combineDistanceAndRestaurantResults(keywordList[0], restaurantList, distanceList);
      utils.checkForNoRestaurants(restaurantList, 'Combine and Sort By Travel Duration');
      let detailsList = await utils.getManyPlacesDetailedInfo(restaurantList);
      restaurantList = utils.combineDetailAndRestaurantResults(restaurantList, detailsList);
      return restaurantList;
    }));

    //console.log(totalResults);
    res.send(totalResults.reduce((acc, cur) => {
      console.log(cur);
      acc = acc.concat(cur);
      return acc;
    }, []));
  } catch(error) {
      console.log(error.name + ': ' + error.message);
      if (error.name === 'ResultNotFound Error') {
        res.status(404).send('No restaurants found');
      } else {
        res.status(500).send();
      }
  }
});

module.exports = router;