import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CoreUserInputPanel from './../components/CoreUserInputPanel';
import CoreSearchResultsPanel from './../components/CoreSearchResultsPanel';

import SurpriseMeSearchContainer from './SurpriseMeSearchContainer';

import { SET_SEARCH_SCREEN, SET_LATITUDE, SET_LONGITUDE } from '../store/actions/generalActions';

//Bootstrap
import { Container, Button, Card, Row, Col} from 'react-bootstrap';

export const CoreTitleContainer = () => {
  const searchScreen = useSelector(state => state.generalReducers.searchScreen);
  const serverResponse = useSelector(state => state.searchResultsReducer.serverResponse);
  const searchResults = useSelector(state => state.searchResultsReducer.searchResults);
  const dispatch = useDispatch();

  // componentDidMount to get user locations
  useEffect(() => {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition((position) => {
        dispatch({ type: SET_LATITUDE, newValue: position.coords.latitude });
        dispatch({ type: SET_LONGITUDE, newValue: position.coords.longitude });
      }, (error) => {
        dispatch({ type: SET_LATITUDE, newValue: 'error-latitude' });
        dispatch({ type: SET_LONGITUDE, newValue: 'error-longitude' });
      });
    }
  }, [dispatch]);

  const searchScreenHandler = (value) => {
    dispatch({ type: SET_SEARCH_SCREEN, newValue: value});
  }

  const divStyle = {
    textAlign: 'center'
  }

  const containerStyle = {
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(33, 37, 41)' // 'white'
  }
  const rowStyle = {
    marginTop: '20px',
    marginBottom: '20px'
  };

  const btnStyle = {
    margin: '5px',
    backgroundColor: '#ff0051c2',
    borderColor: '#ff0051c2'
  }

  const cardStyle = {
    // color: 'rgb(33, 37, 41)',
    background: 'transparent',
    border: '0'
  }

  const cardBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
  
  const spanStyle = {
    fontWeight: 'bold'
  }

  const btnGroupStyle = {
    marginTop: '25px'
  }

  const cardTitleStyle = {
    fontSize: '1.7rem',
    fontWeight: 50
  }

  let panel = null;

  switch (searchScreen) {
    case ('surprise-me') :
      panel = (
        <SurpriseMeSearchContainer/>
      );
      break;
    case ('has-input') :
      panel = (
        <CoreUserInputPanel />
      );
      break;
    case ('did-search') :
      panel = (
        <CoreSearchResultsPanel 
          serverResponse={serverResponse}
          searchResults={searchResults}
          resetSearchScreenHandler={() => searchScreenHandler('')}/>
      );
      break;
    default:
      panel = (
        <Card.Body style={cardBodyStyle}>
          <Card.Title style={cardTitleStyle}>Do you have anything in mind?</Card.Title>
          <div style={btnGroupStyle}>
            <Button style={btnStyle}
              onClick={() => searchScreenHandler('surprise-me')}>No idea, that's why I'm here <span style={spanStyle}>(duh)</span></Button>
            <Button 
              style={btnStyle}
              onClick={() => searchScreenHandler('has-input')}>Surprisingly, yes</Button>
          </div>
        </Card.Body>
      );
  };

  return (
    <div style={divStyle}>
        <Container style={containerStyle}>
          <Row style={rowStyle}>
            <Col>
              <Card style={cardStyle}>
                { panel }
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
  );
}