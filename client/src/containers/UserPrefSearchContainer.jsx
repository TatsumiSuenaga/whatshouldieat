import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as SearchActions from '../store/actions/searchActions';
import { SET_SEARCH_SCREEN } from '../store/actions/generalActions';

import axios from 'axios';
import SearchCriteriaItemPanel from '../components/SearchCriteriaItemPanel.jsx';

import {Button, Card, Form, FormControl, Spinner} from 'react-bootstrap';

const UserPrefSearchContainer = () => {
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();
    const generalStore = useSelector(state => state.generalReducers);
    const selectedAll = useSelector(state => state.searchReducers.selectedAll);
    const restaurantList = useSelector(state => state.searchReducers.searchList);

    const btnStyle = {
        margin: '5px'
    };

    const screenHandler = (value) => {
      dispatch({type: SET_SEARCH_SCREEN, newValue: value});
    }

    const onChangeHandler = (event) => {
      dispatch({type: event.target.name, newValue: event.target.value});
    }

    const toggleSelectAllHandler = (event) => {
      const searchList = [...restaurantList];
      const toggleValue = !selectedAll;
      searchList.forEach((searchItem) => {
        searchItem.doSearch = toggleValue;
      });

      dispatch(SearchActions.toggleSelectedAllSearchList());
      dispatch(SearchActions.setSearchList(searchList));
    }

    const randomizeSearchListHandler = (event) => {
      const searchList = [...restaurantList];
  
      searchList.forEach((searchItem) => {
        searchItem.doSearch = (Math.round(Math.random())) ? true : false;
      });
  
      dispatch(SearchActions.setSearchList(searchList));
    }

    const doSearchHandler = (event, id) => {
      const itemId = restaurantList.findIndex(item => {
        return item.id === id;
      });
  
      const searchItem = {
        ...restaurantList[itemId]
      };
  
      searchItem.doSearch = !searchItem.doSearch;
      const searchList = [...restaurantList];
      searchList[itemId] = searchItem;
  
      console.log(searchItem.doSearch);
  
      dispatch(SearchActions.setSearchList(searchList));
    }

    const restaurantSearchHandler = (event) => {
      event.preventDefault();
      setClicked(true);
      dispatch(SearchActions.removeSearchResults());
      dispatch(SearchActions.removeServerResponse());

      const distance = generalStore.distance;
      const searchList = [...restaurantList];
      const restaurantQueryList = searchList.filter((searchItem) => {
        return searchItem.doSearch === true;
      });
      if (restaurantQueryList.length > 0 && !isNaN(distance) && distance !== "" && distance > 0 && distance <= 10) {
        restaurantQueryList.forEach((restaurantItem) => {
          axios.get('http://localhost:9000/restaurantSearch/surprise_me', {
            params: {
              location: generalStore.latitude + ',' + generalStore.longitude,
              radius: distance * 1610,
              keyword: restaurantItem.searchScreen,
              rating: generalStore.rating,
              price: generalStore.price,
              travelDuration: generalStore.travelDuration,
              travelMode: generalStore.transportationType
            }
          })
          .then((response) =>  {
            const responseList = response.data;
            if (responseList) {
              console.log(responseList);
              let responseString = '';
              // comment for now as it is only a single object returned
              // responseList.forEach((restaurant) => {
              //   console.log(restaurant.name);
              //   responseString += restaurant.name + ', ';
              // });
  
              responseString = responseList.name;
              console.log(responseString);
              dispatch(SearchActions.addSearchResults(responseList));
            } else {
              console.log('No restaurants found');
              dispatch(SearchActions.addServerResponse('No restaurants found'));
            }
            screenHandler('did-search');
          })
          .catch((error) => {
              console.log(error);
              dispatch(SearchActions.setServerResponse('Search Error!'));
              screenHandler('did-search');
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
        dispatch(SearchActions.addServerResponse(errorResponse));
        console.log(errorResponse);
        screenHandler('did-search');
      }
    }

    return (
        <Card.Body>
          <Card.Title>Choose the cuisine</Card.Title>
          <Form onSubmit={restaurantSearchHandler}>
            <Form.Group controlId="searchCuisineList">
              <SearchCriteriaItemPanel 
              searchList={restaurantList}
              changed={doSearchHandler}/>
            </Form.Group>
            <Form.Group controlId="searchDistance">
              <Form.Label>Distance (in miles)</Form.Label>
              <FormControl
                name="SET_DISTANCE"
                aria-label="distance"
                aria-describedby="basic-addon1"
                value={generalStore.distance}
                onChange={onChangeHandler}/>
            </Form.Group>
            {!clicked ?
              <Button
                style={btnStyle}
                variant="success"
                type="submit">
                  Search
              </Button>
              :
              <Button
                style={btnStyle}
                variant="success"
                disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  &nbsp;Loading...
              </Button>
            }
            <Button
              style={btnStyle}
              variant="warning"
              onClick={(event)=> {randomizeSearchListHandler()}}>
                Randomize
            </Button>
            <Button
              style={btnStyle} 
              variant="primary"
              onClick={(event) => {toggleSelectAllHandler()}}>
                  {!selectedAll ? <span>Select All</span> : <span>Unselect All</span>}
            </Button>
            <Button
              style={btnStyle} 
              variant="danger"
              onClick={() => screenHandler('start')}>
                Back
            </Button>
          </Form>
      </Card.Body>
    );
}

export default UserPrefSearchContainer;