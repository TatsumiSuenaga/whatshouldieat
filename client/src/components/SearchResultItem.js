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
          <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{this.props.restaurant.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.props.restaurant.cuisine}</Card.Subtitle>
                <Card.Text>
                    Rating: {this.props.restaurant.rating} <br/>
                    Price: {this.props.restaurant.price_level}<br/>
                    Distance: {this.props.restaurant.distance.text}<br/>
                    Duration: {this.props.restaurant.duration.text}<br/>
                    Open Hours: {this.getTodaysOpeningHours()}
                </Card.Text>
                <Card.Link href={this.props.restaurant.website} target="_blank">Website</Card.Link>
            </Card.Body>
        </Card>
      )
  }
}

export default SearchResultItem;