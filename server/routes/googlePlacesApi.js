var express = require('express');
var axios = require('axios');
require('dotenv').config();
var router = express.Router();
var constants = require('../shared/constants');
var utils = require('../shared/utils');

router.get('/surprise_me', function(req, res, next) {
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
      // console.log(distanceList);
      restaurantList = utils.combineAndOrSortByTravelDuration(null, restaurantList, distanceList, travelDuration);
      utils.checkForNoRestaurants(restaurantList, 'Combine and Sort By Travel Duration');
      randomRestaurant = (travelDuration > -1) 
                          ? utils.getRandomFromArray(restaurantList) : restaurantList[0];
      return utils.getPlaceDetailedInfo(randomRestaurant);
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
        } else {
          res.status(500).send();
        }
    });
});

// router.get('/user_input', function(req, res, next) {
//   // Distance Matrix fields
//   const travelDuration = parseInt(req.query.travelDuration);
//   const travelMode = req.query.travelMode;

//   // init google api get request
//   const location = (req.query.location) ? req.query.location : constants.DEFAULT_LOCATION; // change this before launch, cannot support default location
//   const radius = (req.query.radius) ? parseInt(req.query.radius) : constants.DEFAULT_RADIUS;
//   // const keyword = (req.query.keyword) ? req.query.keyword : utils.getRandomFromArray(constants.CUISINE_LIST);
//   const keyword = (travelDuration > -1) ? 'constants.TIME_CONSTRAINT' : utils.getRandomFromArray(constants.CUISINE_LIST);
//   console.log(keyword);

//   // sorting, if any of the below has a value of -1, then it is irrelevant in sorting
//   const rating = parseInt(req.query.rating);
//   const price = parseInt(req.query.price);

//   // add min/maxprice params as price if price != -1. else do
//   let randomRestaurant;
//   let restaurantList;
//   axios.get(constants.BASE_NEARBY_SEARCH_URL, utils.getBaseSearchParams(location, radius, keyword, price))
//     .then((response) => {
//       const responseList = response.data.results;
//       // console.log(responseList);
//       utils.checkForNoRestaurants(responseList, 'Initial Get Request');
      
//       // mandatory rating sort of result list
//       let resultList = utils.filterByRating(rating, responseList);
//       utils.checkForNoRestaurants(resultList, 'Sort By Rating');

//       // we limit results to 25 as anymore would be unnecessary and cause performance issues
//       resultList.length = resultList.length > 25 ? 25 : resultList.length;

//       restaurantList = (keyword === constants.TIME_CONSTRAINT)
//                         ? resultList : [utils.getRandomFromArray(resultList)];
//       return utils.getManyPlacesDistance(restaurantList, location, travelMode);
//     })
//     .then((distanceList) => {
//       // console.log(distanceList);
//       restaurantList = utils.combineAndOrSortByTravelDuration(keyword, restaurantList, distanceList, travelDuration);
//       utils.checkForNoRestaurants(restaurantList, 'Combine and Sort By Travel Duration');
//       randomRestaurant = (keyword === constants.TIME_CONSTRAINT) 
//                           ? utils.getRandomFromArray(restaurantList) : restaurantList[0];
//       return utils.getPlaceDetailedInfo(randomRestaurant);
//     }) 
//     .then((results) => {
//       randomRestaurant.opening_hours = results[0].data.result.opening_hours;
//       randomRestaurant.website = results[0].data.result.website;
//       // has found photo
//       if (results.length > 1) {
//         // console.log('multiple api calls complete');
//         // randomRestaurant.photo = results[1].data;
//       }
//       res.send(randomRestaurant);
//     })
//     .catch((error) => {
//         console.log(error.name + ': ' + error.message);
//         if (error.name === 'ResultNotFound Error') {
//           res.status(404).send('No restaurants found');
//         } else {
//           res.status(500).send();
//         }
//     });
// });

module.exports = router;