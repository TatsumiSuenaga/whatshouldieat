import React, { useState } from 'react';
import { Card, 
  Button, 
  Form, 
  ToggleButtonGroup, 
  ButtonToolbar, 
  ToggleButton, 
  Spinner
  } from 'react-bootstrap';

function CoreGeneralInputPanel(props) {
    const [clicked, setClicked] = useState(false);

    const searchHandler = () => {
      setClicked(true);
      props.surpriseMeSearchHandler();
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
                        <ToggleButtonGroup type="radio" name="price" defaultValue={-1}>
                            <ToggleButton value={0}  onChange={props.onChangeHandler}>$</ToggleButton>
                            <ToggleButton value={1}  onChange={props.onChangeHandler}>$$</ToggleButton>
                            <ToggleButton value={2}  onChange={props.onChangeHandler}>$$$</ToggleButton>
                            <ToggleButton value={3}  onChange={props.onChangeHandler}>$$$$</ToggleButton>
                            {/* <ToggleButton value={4}  onChange={props.onChangeHandler}>$$$$$</ToggleButton> */}
                            <ToggleButton value={-1}  onChange={props.onChangeHandler}>Any</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </Form.Row>
                
                <Form.Row><Form.Label style={labelRow}>How are you getting there? </Form.Label></Form.Row>
                <Form.Row id="transportationType" style={rowPadding} name="transportationType" onChange={props.onChangeHandler}>
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
                <Form.Row id="travelDuration" style={rowPadding} name="travelDuration" onChange={props.onChangeHandler}>
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
                        <ToggleButtonGroup type="radio" name="rating" defaultValue={-1}>
                            <ToggleButton name="rating" value={0}  onChange={props.onChangeHandler}>1</ToggleButton>
                            <ToggleButton name="rating" value={1}  onChange={props.onChangeHandler}>2</ToggleButton>
                            <ToggleButton name="rating" value={2}  onChange={props.onChangeHandler}>3</ToggleButton>
                            <ToggleButton name="rating" value={3}  onChange={props.onChangeHandler}>4</ToggleButton>
                            <ToggleButton name="rating" value={-1}  onChange={props.onChangeHandler}>Any</ToggleButton>
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

export default CoreGeneralInputPanel;