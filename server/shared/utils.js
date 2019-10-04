// Utility functions for search
var constants = require('../shared/constants');
var axios = require('axios');
exports.resultNotFoundError = (message) => {
  return {
    name: 'ResultNotFound Error',
    message: message
  };
}

exports.getBaseSearchParams = (location, radius, keyword, price) => {
  let params = {
    location: location,
    radius: radius, 
    type: constants.TYPE,
    opennow: false, //true,
  };

  if (price > -1) {
    params.minprice = price;
    params.maxprice = price;
  }

  if (keyword && keyword !== constants.TIME_CONSTRAINT) {
    params.keyword = keyword;
  }
  params.key = constants.API_KEY;
  return {
    params: params
  };
}

exports.getRandomFromArray = (arr) => {
  let min = 0;
  let max = arr.length;
  return arr[Math.floor(Math.random() * (max - min + 1) + min)];
};

exports.filterByRating = (rating, results) => {
  let filteredResults = [];
  if (rating && rating >= 1) {
    filteredResults = results.filter(restaurant => {
      // floored to nearest integer
      return parseInt(restaurant.rating, 10) >= rating;
    });
  } else {
    filteredResults = results;
  }
  return filteredResults;
};

exports.checkForNoRestaurants = (list, func) => {
  if (!Array.isArray(list) || !list.length) {
    throw resultNotFoundError('@ ' + func + ': No Restaurants Found');
  }
}

const getPlaceDetail = (restaurant) => {
  return axios.get(constants.BASE_DETAIL_URL, {
    params: {
      placeid: restaurant.place_id,
      fields: constants.DEFAULT_FIELDS,
      key: constants.API_KEY
    }
  });
};

const getPlacePhoto = (restaurantPhoto) => {
  return axios.get(constants.BASE_PHOTO_URL, {
    params: {
      photoreference: restaurantPhoto.photo_reference,
      maxwidth: constants.DEFAULT_MAX_WIDTH,
      key: constants.API_KEY
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
  return axios.get(constants.BASE_DISTANCE_URL, {
    params: {
      origins: location,
      destinations: 'place_id:' + restaurant.place_id,
      mode: mode,
      key: constants.API_KEY
    }
  });
};
/**
 * Searches the estimated distance for each restaurant in list
 * @param {*} restaurantList 
 * @param {*} location 
 * @param {*} mode 
 */
exports.getManyPlacesDistance = (restaurantList, location, mode) => {
  const apiArray = restaurantList.map(restaurant => {
    // console.log(restaurant);
    return getPlaceDistance(restaurant, location, mode);
  });
  // console.log(apiArray);
  return axios.all(apiArray);
}

exports.getManyPlacesDetailedInfo = (restaurantList) => {
  const apiArray = restaurantList.map(restaurant => {
    // console.log(restaurant);
    return getPlaceDetailedInfo(restaurant);
  });
  // console.log(apiArray);
  return axios.all(apiArray);
}

exports.combineAndOrSortByTravelDuration = (keyword, restaurantList, distanceList, travelDuration) => {
  let combineList = [];
  if (travelDuration > -1) {
    const timeConstraint = (travelDuration === 0) ? 600 : 1080;
    for (let i = 0; i < restaurantList.length; i++) {
      const tempDistanceList = distanceList[i].data.rows[0];
      if (parseInt(tempDistanceList.elements[0].duration.value) <= timeConstraint) {
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

exports.combineDetailAndRestaurantResults = (restaurantList, detailList) => {
  let combineList = [...restaurantList];
  for (let i = 0; i < restaurantList.length; i++) {
    combineList[i].opening_hours = detailList[i].data ? detailList[i].data.result.opening_hours : null;
    combineList[i].website = detailList[i].data ?  detailList[i].data.result.website : null ;
  }
  return combineList;
}

exports.combineDistanceAndRestaurantResults = (keyword, restaurantList, distanceList) => {
  let combineList = [];
  for (let i = 0; i < restaurantList.length; i++) {
    const tempDistanceList = distanceList[i].data.rows[0];
    combineList.push({
      id: restaurantList[i].id,
      name: restaurantList[i].name,
      place_id: restaurantList[i].place_id,
      photos: restaurantList[i].photos,
      rating: restaurantList[i].rating,
      cuisine: keyword,
      price_level: restaurantList[i].price_level,
      distance: tempDistanceList.elements[0].distance,
      duration: tempDistanceList.elements[0].duration
    });
  }
  return combineList;
}