import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import SearchItem from '../models/searchItem';
import SearchCriteriaPanel from '../components/SearchCriteriaPanel';

//Bootstrap
import {Button, Container, Card, Row, Col, InputGroup} from 'react-bootstrap';

class App extends Component{
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
      distance: 3000,
      selectedAll: false,
      latitude: '',
      longitude: '',
      responseList : []
    }
    this.getUserLocation = this.getUserLocation.bind(this);
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
    searchList.forEach((searchItem) => {
      searchItem.doSearch = !searchItem.doSearch;
    });

    this.setState({
      selectedAll: !this.state.selectedAll,
      searchList: searchList
    });
  }

  restaurantSearchHandler = (event) => {
    const searchList = [...this.state.searchList];
    const restaurantQueryList = searchList.filter((searchItem) => {
      return searchItem.doSearch === true;
    });
    if (restaurantQueryList.length > 0) {
      this.setState({ 
        responseList: [],
        serverResponse: '' 
      });
      restaurantQueryList.forEach((restaurantItem) => {
        axios.get('http://localhost:9000/restaurantSearch', {
          params: {
            location: this.state.latitude + ',' + this.state.longitude,
            radius: this.state.distance,
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
      this.setState({ serverResponse: 'Please select a cuisine!' });
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
    return (
      <div className="App">
        <Container>
          <header>What Should I Eat?</header>
          <Row>
            <Col>
              <Card bg="light" border="light">
                {/* <Card.Header>Search Criteria</Card.Header> */}
                <Card.Body>
                  <Card.Title>Choose the cuisine</Card.Title>
                  <InputGroup>
                    <SearchCriteriaPanel 
                      searchList={this.state.searchList}
                      changed={this.doSearchHandler}/>
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Button
             variant="success"
             onClick={(event) => {this.restaurantSearchHandler()}}>Search</Button>
            <Button variant="warning">Randomize</Button>
            <Button 
              variant="primary"
              onClick={(event) => {this.toggleSelectAllHandler()}}>
                {!this.state.selectedAll ? <span>Select All</span> : <span>Unselect All</span>}</Button>
          </Row>
          <Row><p>{this.state.serverResponse}</p></Row>
          
        </Container>
      </div>
    );
  }
}

export default App;
