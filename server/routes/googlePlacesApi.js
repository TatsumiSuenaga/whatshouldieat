var express = require('express');
var axios = require('axios');
require('dotenv').config();
var router = express.Router();

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const API_KEY = process.env.GOOGLE_API_KEY;
const DEFAULT_LOCATION = '40.029832231894524,-83.01501735712759';
const DEFAULT_RADIUS = '2500'; 
const DEFAULT_KEYWORD = 'thai';
const TYPE = 'restaurant';
const DEFAULT_SEARCH_TYPE = 'SURPRISE';

router.get('/', function(req, res, next) {
  const location = (req.query.location) ? req.query.location : DEFAULT_LOCATION;
  const radius = (req.query.radius) ? req.query.radius : DEFAULT_RADIUS;
  const keyword = (req.query.keyword) ? req.query.keyword : DEFAULT_KEYWORD;
  const search = (req.query.search_type) ? req.query.search_typ : DEFAULT_SEARCH_TYPE;
  axios.get(BASE_URL, {
      params: {
        location: location,
        radius: radius,
        keyword: keyword, 
        type: TYPE,
        key: API_KEY 
      }
    })
    .then(function (response) {
        //console.log(response.data.results);
        res.send(response.data.results);
    })
    .catch(function(error) {
        console.log(error);
    })
});

module.exports = router;