import React from 'react';
import PropTypes from 'prop-types';

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
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      minHeight: '85vh',
      minWidth: '500px'
    }

    const cardBodyStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
    
    let panel = null;

    switch (props.searchType) {
      case ('surprise-me') :
        panel = (
          <Card.Body style={cardBodyStyle}>
            <Card.Title>Anything in mind?</Card.Title>
            <div>
              <Button style={btnStyle}
                onClick={props.surpriseMeHandler}>No idea, surprise me</Button>
              <Button 
                style={btnStyle}
                onClick={props.hasInputHandler}>Yes</Button>
            </div>
          </Card.Body>
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