import React, { Component } from 'react';

import {Card} from 'react-bootstrap';

class SearchResultItem extends Component {
    getTodaysOpeningHours = () => {
        let currentDOW = (new Date()).getDay() - 1;
        currentDOW = (currentDOW >= 0) ? currentDOW : 6;
        return this.props.restaurant.opening_hours.weekday_text[currentDOW];
    }

  render() {
      return (
          <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body>
                <Card.Title>{this.props.restaurant.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {this.props.restaurant.cuisine ? this.props.restaurant.cuisine : 'Unknown Cuisine'}
                </Card.Subtitle>
                <Card.Text>
                    Rating: {this.props.restaurant.rating ?
                      this.props.restaurant.rating : 'No Rating Found'} <br/>
                    Price: {this.props.restaurant.price_level ?
                      this.props.restaurant.price_level : 'No Price Found'}<br/>
                    Distance: {this.props.restaurant.distance ?
                      this.props.restaurant.distance.text : ' No Distance Found'}<br/>
                    Duration: {this.props.restaurant.duration ?
                      this.props.restaurant.duration.text : 'No Duration Found'}<br/>
                    Open Hours: {this.getTodaysOpeningHours()}
                </Card.Text>
                <Card.Link href={this.props.restaurant.website} target="_blank">
                  {this.props.restaurant.website? 'Website' : 'Website Not Found'}
                </Card.Link>
            </Card.Body>
        </Card>
      )
  }
}

export default SearchResultItem;