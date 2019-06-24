import React, {Component} from 'react';
import axios from 'axios';
import './CoreSearch.css';
import SearchItem from '../models/searchItem';
import SearchCriteriaPanel from '../components/SearchCriteriaPanel';

//Bootstrap
import {Button, Container, Card, Row, Col, Form, FormControl} from 'react-bootstrap';

export default class CoreSearch extends Component{
  constructor(props) {
    super(props);
    this.state = {
      serverResponse: '',
      searchList: [
        new SearchItem('Japanese'),
        new SearchItem('Korean'),
        new SearchItem('Indian'),
        new SearchItem('Chinese'),
        new SearchItem('Thai'),
        new SearchItem('Mexican'),
        new SearchItem('Italian'),
        new SearchItem('Vietnamese'),
        new SearchItem('Burgers'),
        new SearchItem('Pizza'),
        new SearchItem('Wings'),
        new SearchItem('BBQ')
      ],
      distance: 3,
      selectedAll: false,
      latitude: '',
      longitude: '',
      responseList : []
    }
    this.getUserLocation = this.getUserLocation.bind(this);
  }

  onChangeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value });
  }

  doSearchHandler = (event, id) => {
    const itemId = this.state.searchList.findIndex(item => {
      return item.id === id;
    });

    const searchItem = {
      ...this.state.searchList[itemId]
    };

    searchItem.doSearch = !searchItem.doSearch;
    const searchList = [...this.state.searchList];
    searchList[itemId] = searchItem;

    console.log(searchItem.doSearch);

    this.setState((prevState, props) => {
      return {
        searchList: searchList
      };
    });
  }

  toggleSelectAllHandler = (event) => {
    const searchList = [...this.state.searchList];
    const toggleValue = !this.state.selectedAll;
    searchList.forEach((searchItem) => {
      searchItem.doSearch = toggleValue;
    });

    this.setState({
      selectedAll: toggleValue,
      searchList: searchList
    });
  }

  randomizeSearchListHandler = (event) => {
    const searchList = [...this.state.searchList];

    searchList.forEach((searchItem) => {
      searchItem.doSearch = (Math.round(Math.random())) ? true : false;
    });

    this.setState({
      searchList: searchList
    });
  }

  restaurantSearchHandler = (event) => {
    event.preventDefault();
    const distance = this.state.distance;
    const searchList = [...this.state.searchList];
    const restaurantQueryList = searchList.filter((searchItem) => {
      return searchItem.doSearch === true;
    });
    if (restaurantQueryList.length > 0 && !isNaN(distance) && distance !== "" && distance > 0 && distance <= 10) {
      this.setState({ 
        responseList: [],
        serverResponse: '' 
      });
      restaurantQueryList.forEach((restaurantItem) => {
        axios.get('http://localhost:9000/restaurantSearch', {
          params: {
            location: this.state.latitude + ',' + this.state.longitude,
            radius: distance * 1610,
            keyword: restaurantItem.searchType
          }
        })
        .then((response) =>  {
          const responseList = response.data;
          if (responseList) {
            console.log(responseList);
            let responseString = '';
            responseList.forEach((restaurant) => {
              console.log(restaurant.name);
              responseString += restaurant.name + ', ';
            });
            this.setState({ 
              responseList: [...this.state.responseList, ...responseList],
              serverResponse: this.state.serverResponse + responseString 
            });
          } else {
            console.log('No restaurants found');
            this.setState({ serverResponse: 'No restaurants found!' });
          }
        })
        .catch((error) => {
            console.log(error);
            this.setState({ serverResponse: 'Search Error!' });
        });
      });
    } else {
      let errorResponse = '';
      if (distance !== "" && !isNaN(distance)) {
        if ((distance <= 0 || distance > 10) && restaurantQueryList.length > 0) {
          errorResponse = 'SearchError: distance is ' + distance + ' which is not within 0 and 10';
        }
        else if ((distance > 0 && distance <= 10) && restaurantQueryList.length <= 0) {
          errorResponse = 'SearchError: no cuisine chosen';
        }
        else if ((distance <= 0 || distance > 10) && restaurantQueryList.length <= 0) {
          errorResponse = 'SearchError: no cuisine chosen and distance is ' + distance + ' which is not within 0 and 10';
        }
      } else {
        if (restaurantQueryList.length > 0) {
          errorResponse = 'SearchError: distance is not within 0 and 10';
        }
        else if (restaurantQueryList.length <= 0) {
          errorResponse = 'SearchError: no cuisine chosen and distance is not within 0 and 10';
        }
      }
      this.setState({ serverResponse: errorResponse });
      console.log(errorResponse);
      
    }
  }

  getUserLocation() {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      }, (error) => {
        this.setState({
          latitude: 'error-latitude',
          longitude: 'error-longitude'
        });
      });
    }
  }

  componentDidMount() {
    this.getUserLocation();
  }

  render() {
    const distance = this.state.distance;
    return (
      <div className="CoreSearch">
        <Container>
          <header>What Should I Eat?</header>
          <Row>
            <Col>
              <Card bg="light" border="light">
                <Card.Body>
                  <Card.Title>Choose the cuisine</Card.Title>
                  <Form onSubmit={this.restaurantSearchHandler}>
                    <Form.Group controlId="searchCuisineList">
                      <SearchCriteriaPanel 
                        searchList={this.state.searchList}
                        changed={this.doSearchHandler}/>
                    </Form.Group>
                    <Form.Group controlId="searchDistance">
                          <Form.Label>Distance (in miles)</Form.Label>
                          <FormControl
                            name="distance"
                            aria-label="distance"
                            aria-describedby="basic-addon1"
                            value={distance}
                            onChange={this.onChangeHandler}
                          />
                    </Form.Group>
                    <Button
                    variant="success"
                    type="submit">Search</Button>
                    <Button
                    variant="warning"
                    onClick={(event)=> {this.randomizeSearchListHandler()}}>Randomize</Button>
                    <Button 
                      variant="primary"
                      onClick={(event) => {this.toggleSelectAllHandler()}}>
                        {!this.state.selectedAll ? <span>Select All</span> : <span>Unselect All</span>}</Button>
                  
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row><p>{this.state.serverResponse}</p></Row>
          
        </Container>
      </div>
    );
  }
}
