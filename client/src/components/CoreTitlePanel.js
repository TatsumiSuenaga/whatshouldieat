import React from 'react';
import PropTypes from 'prop-types';

import Aux from './../hoc/Aux';
import CoreUserInputPanel from './CoreUserInputPanel';

//Bootstrap
import {Button, Card, Row, Col} from 'react-bootstrap';

const coreTitlePanel = (props) => {

    const rowStyle = {
      marginTop: '20px',
      marginBottom: '20px'
    };

    const btnStyle = {
      margin: '5px'
    }

    const cardStyle = {
      color: 'rgb(33, 37, 41)',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }
    
    let panel = null;

    switch (props.searchType) {
      case ('surprise-me') :
        panel = (
          <Aux>
            <Card.Title>Do you know what you want?</Card.Title>
            <Button style={btnStyle}
              onClick={props.surpriseMeHandler}>No, Surprise Me</Button>
            <Button 
              style={btnStyle}
              onClick={props.hasInputHandler}>Yes</Button>
          </Aux>
        );
        break;
      case ('has-input') :
        panel = (
          <CoreUserInputPanel
            restaurantSearchHandler={props.restaurantSearchHandler} 
            searchList={props.searchList}
            doSearchHandler={props.doSearchHandler}
            distance={props.distance}
            onChangeHandler={props.onChangeHandler}
            randomizeSearchListHandler={props.randomizeSearchListHandler}
            toggleSelectAllHandler={props.toggleSelectAllHandler}
            selectedAll={props.selectedAll}/>
        );
        break;
      default:
        panel = null;
    };

    return (
      <Row style={rowStyle}>
        <Col>
          <Card bg="light" border="light" style={cardStyle}>
            <Card.Body></Card.Body>
            { panel }
          </Card>
        </Col>
      </Row>
    );
};

coreTitlePanel.propTypes = {
  searchType: PropTypes.string.isRequired
}

export default coreTitlePanel;