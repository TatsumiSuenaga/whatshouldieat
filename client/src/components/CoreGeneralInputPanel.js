import React from 'react';
import { Card, Button, Form, ToggleButtonGroup, ButtonToolbar, ToggleButton} from 'react-bootstrap';

const coreGeneralInputPanel = (props) => {

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
                        <ToggleButtonGroup type="radio" name="price">
                            <ToggleButton value={1}>$</ToggleButton>
                            <ToggleButton value={2}>$$</ToggleButton>
                            <ToggleButton value={3}>$$$</ToggleButton>
                            <ToggleButton value={4}>$$$$</ToggleButton>
                            <ToggleButton value={-1}>Any</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </Form.Row>
                
                <Form.Row><Form.Label style={labelRow}>How are you getting there? </Form.Label></Form.Row>
                <Form.Row id="transportationType" style={rowPadding}>
                        <Form.Check
                            inline
                            type="radio"
                            label="On foot"
                            name="transportationTypeRadios"
                            id="transportationTypeRadios1" />
                        <Form.Check
                            inline
                            type="radio"
                            label="On a bike"
                            name="transportationTypeRadios"
                            id="transportationTypeRadios2" />
                        <Form.Check
                            inline
                            type="radio"
                            label="On public transit"
                            name="transportationTypeRadios"
                            id="transportationTypeRadios3" />
                        <Form.Check
                            inline
                            type="radio"
                            label="On a car"
                            name="transportationTypeRadios"
                            id="transportationTypeRadios4" />
                </Form.Row>
                <Form.Row><Form.Label style={labelRow}>How much time do you have? </Form.Label></Form.Row>
                <Form.Row id="travelDuration" style={rowPadding}>
                        <Form.Check
                            inline
                            type="radio"
                            label="In a hurry (< 30mins)"
                            name="travelDurationRadios"
                            id="travelDurationRadios1" />
                        <Form.Check
                            inline
                            type="radio"
                            label="On the clock (30 mins ~ 1 hour)"
                            name="travelDurationRadios"
                            id="travelDurationRadios2" />
                        <Form.Check
                            inline
                            type="radio"
                            label="Time is a social construct"
                            name="travelDurationRadios"
                            id="travelDurationRadios3" />
                </Form.Row>
                <Form.Row><Form.Label style={labelRow}>Rating at least</Form.Label></Form.Row>
                <Form.Row id="rating" style={rowPadding}>
                    <ButtonToolbar>
                        <ToggleButtonGroup type="radio" name="rating">
                            <ToggleButton value={0}>1</ToggleButton>
                            <ToggleButton value={1}>2</ToggleButton>
                            <ToggleButton value={2}>3</ToggleButton>
                            <ToggleButton value={3}>4</ToggleButton>
                            <ToggleButton value={-1}>Any</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </Form.Row>
            </Form>
            <Button variant="success">Search</Button>
        </Card.Body>
    );
}

export default coreGeneralInputPanel;