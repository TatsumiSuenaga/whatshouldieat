var express = require('express');
var axios = require('axios');
require('dotenv').config();
var router = express.Router();

const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const apiKey = process.env.GOOGLE_API_KEY;
let location = '40.029832231894524,-83.01501735712759';
let radius = '16093'; // 10 miles
let keyword = 'japanese';
const type = 'restaurant';

router.get('/', function(req, res, next) {
  axios.get(baseUrl, {
      params: {
        location: location,
        radius: radius,
        keyword: keyword, 
        type: type,
        key: apiKey 
      }
    })
    .then(function (response) {
        // console.log(response.data);
        res.send(response.data);
    })
    .catch(function(error) {
        console.log(error);
    })
});

module.exports = router;