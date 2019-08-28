import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CoreUserInputPanel from './CoreUserInputPanel';
import CoreGeneralInputPanel from './CoreGeneralInputPanel';
import CoreSearchResultsPanel from './../components/CoreSearchResultsPanel';

//Bootstrap
import { Container, Button, Card, Row, Col} from 'react-bootstrap';

export const CoreTitleContainer = () => {
  const searchScreen = useSelector(state => state.searchScreen);
  const dispatch = useDispatch();

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
        <CoreGeneralInputPanel/>
      );
      break;
    case ('has-input') :
      panel = (
        <CoreUserInputPanel />
      );
      break;
    case ('did-search') :
      panel = (
        <CoreSearchResultsPanel/>
      );
      break;
    default:
      panel = (
        <Card.Body style={cardBodyStyle}>
          <Card.Title style={cardTitleStyle}>Do you have anything in mind?</Card.Title>
          <div style={btnGroupStyle}>
            <Button style={btnStyle}
              onClick={() => dispatch({type: 'SET_SEARCH_SCREEN', newValue: 'surprise-me'})}>No idea, that's why I'm here <span style={spanStyle}>(duh)</span></Button>
            <Button 
              style={btnStyle}
              onClick={() => dispatch({type: 'SET_SEARCH_SCREEN', newValue: 'has-input'})}>Surprisingly, yes</Button>
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