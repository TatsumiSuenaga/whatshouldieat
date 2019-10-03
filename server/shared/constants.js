// General defaults for all Google Searchs
exports.API_KEY = process.env.GOOGLE_API_KEY;
exports.CUISINE_LIST = [
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
exports.BASE_NEARBY_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
exports.DEFAULT_LOCATION = '40.029832231894524,-83.01501735712759';
exports.DEFAULT_RADIUS = '2500';
exports.TYPE = 'restaurant';
exports.TIME_CONSTRAINT = 'TIME_CONSTRAINT'; // constant to check whether search will be affected by a time constraint

// Specific defaults for Google Places Detail Search
exports.BASE_DETAIL_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';
exports.DEFAULT_FIELDS = 'opening_hours,website,price_level'

// Specific defaults for Google Places Photo Search
exports.BASE_PHOTO_URL ='https://maps.googleapis.com/maps/api/place/photo?';
exports.DEFAULT_MAX_WIDTH = '350';

// Specific defaults for Google Distance Matrix Search
exports.BASE_DISTANCE_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';