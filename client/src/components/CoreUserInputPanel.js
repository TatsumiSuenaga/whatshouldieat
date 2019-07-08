import React from 'react';

import SearchCriteriaItemPanel from './SearchCriteriaItemPanel';

import {Button, Card, Form, FormControl} from 'react-bootstrap';

const coreUserInputPanel = (props) => {
    const btnStyle = {
        margin: '5px'
    };

    return (
        <Card.Body>
            <Card.Title>Choose the cuisine</Card.Title>
            <Form onSubmit={props.restaurantSearchHandler}>
                <Form.Group controlId="searchCuisineList">
                    <SearchCriteriaItemPanel 
                    searchList={props.searchList}
                    changed={props.doSearchHandler}/>
                </Form.Group>
                <Form.Group controlId="searchDistance">
                        <Form.Label>Distance (in miles)</Form.Label>
                        <FormControl
                        name="distance"
                        aria-label="distance"
                        aria-describedby="basic-addon1"
                        value={props.distance}
                        onChange={props.onChangeHandler}/>
                </Form.Group>
                <Button
                    style={btnStyle}
                    variant="success"
                    type="submit">Search</Button>
                <Button
                    style={btnStyle}
                    variant="warning"
                    onClick={(event)=> {props.randomizeSearchListHandler()}}>Randomize</Button>
                <Button
                    style={btnStyle} 
                    variant="primary"
                    onClick={(event) => {props.toggleSelectAllHandler()}}>
                        {!props.selectedAll ? <span>Select All</span> : <span>Unselect All</span>}
                </Button>
            </Form>
        </Card.Body>
    );
}

export default coreUserInputPanel;