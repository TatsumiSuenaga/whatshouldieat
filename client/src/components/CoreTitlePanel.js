import React from 'react';
import PropTypes from 'prop-types';

import CoreUserInputPanel from './CoreUserInputPanel';
import CoreGeneralInputPanel from './CoreGeneralInputPanel';

//Bootstrap
import {Button, Card, Row, Col} from 'react-bootstrap';

const coreTitlePanel = (props) => {

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
      border: '0',
      // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      // minHeight: '85vh',
      // minWidth: '500px'
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

    switch (props.searchType) {
      case ('surprise-me') :
        panel = ( 
          <CoreGeneralInputPanel />
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
        panel = (
          <Card.Body style={cardBodyStyle}>
            <Card.Title style={cardTitleStyle}>Do you have anything in mind?</Card.Title>
            <div style={btnGroupStyle}>
              <Button style={btnStyle}
                onClick={props.surpriseMeHandler}>No idea, that's why I'm here <span style={spanStyle}>(duh)</span></Button>
              <Button 
                style={btnStyle}
                onClick={props.hasInputHandler}>Surprisingly, yes</Button>
            </div>
          </Card.Body>
        );
    };

    return (
      <Row style={rowStyle}>
        <Col>
          <Card style={cardStyle}>
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