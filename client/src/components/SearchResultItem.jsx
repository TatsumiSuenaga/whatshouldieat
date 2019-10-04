import React from 'react';

import {Card} from 'react-bootstrap';

export default ({restaurant}) =>  {
  const getTodaysOpeningHours = () => {
      let currentDOW = (new Date()).getDay() - 1;
      currentDOW = (currentDOW >= 0) ? currentDOW : 6;
      return restaurant.opening_hours.weekday_text[currentDOW];
  }

  const prettifyPriceLevel = () => {
    let styledStr = '$';
    const level = parseInt(restaurant.price_level, 10);
    for (let i = 0; i < level; i++) {
      styledStr += '$';
    }
    return styledStr;
  }

  return (
      <Card style={{ width: '18rem', margin: 'auto' }}>
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {restaurant.cuisine ? restaurant.cuisine : null }
          </Card.Subtitle>
          <Card.Text>
              Rating: {restaurant.rating ?
                restaurant.rating : 'No Rating Found'} <br/>
              Price: {restaurant.price_level ?
                prettifyPriceLevel() : 'No Price Found'}<br/>
              Distance: {restaurant.distance ?
                restaurant.distance.text : ' No Distance Found'}<br/>
              Duration: {restaurant.duration ?
                restaurant.duration.text : 'No Duration Found'}<br/>
              Open Hours: {restaurant.opening_hours ? getTodaysOpeningHours() : 'No Opening Hours Found'}
          </Card.Text>
          <Card.Link href={restaurant.website} target="_blank">
            {restaurant.website? 'Website' : 'Website Not Found'}
          </Card.Link>
        </Card.Body>
    </Card>
  )
}