import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as SearchActions from '../store/actions/searchActions';
import { SET_SEARCH_SCREEN } from '../store/actions/generalActions';

import axios from 'axios';
import { Card, 
  Button, 
  Form, 
  ToggleButtonGroup, 
  ButtonToolbar, 
  ToggleButton, 
  Spinner
  } from 'react-bootstrap';

function SurpriseMeSearchContainer() {
    const [clicked, setClicked] = useState(false);
    const generalStore = useSelector(state => state.generalReducers);

    const dispatch = useDispatch();

    const surpriseMeSearchHandler = () => {
      dispatch(SearchActions.removeSearchResults());
      dispatch(SearchActions.removeServerResponse());
      axios.get('http://localhost:9000/restaurantSearch/surprise_me', {
        params: {
          location: generalStore.latitude + ',' + generalStore.longitude,
          radius: generalStore.distance * 1610,
          rating: generalStore.rating,
          price: generalStore.price,
          travelDuration: generalStore.travelDuration,
          travelMode: generalStore.transportationType
        }
      })
      .then((response) =>  {
        const randomRestaurant = response.data;
        if (randomRestaurant) {
          // console.log(randomRestaurant);
          dispatch(SearchActions.setSearchResults([randomRestaurant]));
        } else {
          // console.log('No restaurants found');
          dispatch(SearchActions.setServerResponse('No restaurants found!'));
        }
        dispatch({type: SET_SEARCH_SCREEN, newValue: 'did-search'});
      })
      .catch((error) => {
          dispatch(SearchActions.setServerResponse('Server Error!'));
          dispatch({type: SET_SEARCH_SCREEN, newValue: 'did-search'});
      });
    }

    const searchHandler = () => {
      setClicked(true);
      surpriseMeSearchHandler();
    }

    const onChangeHandler = (event) => {
      dispatch({type: event.target.name, newValue: event.target.value});
    }

    const cardTitleStyle = {
        fontSize: '1.7rem',
        fontWeight: 50
    }

    const labelRow = {
        color: 'rgb(136, 142, 149)'
    }

    const rowPadding = {
        paddingBottom: '30px'
    }

    return (
        <Card.Body>
            <Card.Title style={cardTitleStyle}>A couple of questions before we choose your restaurant</Card.Title>
            <Form>
                <Form.Row><Form.Label style={labelRow}>Price range?</Form.Label></Form.Row>
                <Form.Row id="price" style={rowPadding}>
                    <ButtonToolbar>
                        <ToggleButtonGroup type="radio" name="SET_PRICE" defaultValue={-1}>
                            <ToggleButton value={0}  onChange={onChangeHandler}>$</ToggleButton>
                            <ToggleButton value={1}  onChange={onChangeHandler}>$$</ToggleButton>
                            <ToggleButton value={2}  onChange={onChangeHandler}>$$$</ToggleButton>
                            <ToggleButton value={3}  onChange={onChangeHandler}>$$$$</ToggleButton>
                            {/* <ToggleButton value={4}  onChange={onChangeHandler}>$$$$$</ToggleButton> */}
                            <ToggleButton value={-1}  onChange={onChangeHandler}>Any</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </Form.Row>
                
                <Form.Row><Form.Label style={labelRow}>How are you getting there? </Form.Label></Form.Row>
                <Form.Row id="transportationType" style={rowPadding} name="SET_TRANSPORTATION_TYPE" onChange={onChangeHandler}>
                        <Form.Check
                            inline
                            type="radio"
                            label="On foot"
                            name="transportationType"
                            value={'walking'}
                            id="transportationTypeRadios1"/>
                        <Form.Check
                            inline
                            type="radio"
                            label="On a bike"
                            name="transportationType"
                            value={'bicycling'}
                            id="transportationTypeRadios2"/>
                        <Form.Check
                            inline
                            type="radio"
                            label="On public transit"
                            name="transportationType"
                            value={'transit'}
                            id="transportationTypeRadios3"/>
                        <Form.Check
                            inline
                            type="radio"
                            label="On a car"
                            name="transportationType"
                            value={'driving'}
                            id="transportationTypeRadios4"
                            defaultChecked={true} />
                </Form.Row>
                <Form.Row><Form.Label style={labelRow}>How much time do you have? </Form.Label></Form.Row>
                <Form.Row id="travelDuration" style={rowPadding} name="SET_TRAVEL_DURATION" onChange={onChangeHandler}>
                        <Form.Check
                            inline
                            type="radio"
                            label="In a hurry (< 30mins)"
                            name="travelDuration"
                            value={0}
                            id="travelDurationRadios1"/>
                        <Form.Check
                            inline
                            type="radio"
                            label="On the clock (30 mins ~ 1 hour)"
                            name="travelDuration"
                            value={1}
                            id="travelDurationRadios2"/>
                        <Form.Check
                            inline
                            type="radio"
                            label="Time is a social construct"
                            name="travelDuration"
                            value={-1}
                            defaultChecked={true}
                            id="travelDurationRadios3"/>
                </Form.Row>
                <Form.Row><Form.Label style={labelRow}>Rating at least</Form.Label></Form.Row>
                <Form.Row id="rating" style={rowPadding}>
                    <ButtonToolbar>
                        <ToggleButtonGroup type="radio" name="SET_RATING" defaultValue={-1}>
                            <ToggleButton name="rating" value={0}  onChange={onChangeHandler}>1</ToggleButton>
                            <ToggleButton name="rating" value={1}  onChange={onChangeHandler}>2</ToggleButton>
                            <ToggleButton name="rating" value={2}  onChange={onChangeHandler}>3</ToggleButton>
                            <ToggleButton name="rating" value={3}  onChange={onChangeHandler}>4</ToggleButton>
                            <ToggleButton name="rating" value={-1}  onChange={onChangeHandler}>Any</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </Form.Row>
            </Form>
            {!clicked ?
              <Button
                variant="success"
                onClick={event => searchHandler()}>Search</Button>
              
              :
              <Button variant="success" disabled>
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
        </Card.Body>
    );
}

export default SurpriseMeSearchContainer;