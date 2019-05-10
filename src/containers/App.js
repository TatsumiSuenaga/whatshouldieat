import React, {Component} from 'react';
import './App.css';

//Bootstrap
import {Button, Container, Card, Row, Col, InputGroup} from 'react-bootstrap';

class App extends Component{
  state = {
    cuisineList: [
      {id: 'c1', cuisineType: 'Japanese', doSearch: false},
      {id: 'c2', cuisineType: 'Korean', doSearch: false},
      {id: 'c3', cuisineType: 'Indian', doSearch: false},
      {id: 'c4', cuisineType: 'Chinese', doSearch: false},
      {id: 'c5', cuisineType: 'Thai', doSearch: false},
      {id: 'c6', cuisineType: 'Mexican', doSearch: false},
      {id: 'c7', cuisineType: 'Italian', doSearch: false},
      {id: 'c8', cuisineType: 'Turkish', doSearch: false},
      {id: 'c9', cuisineType: 'Mediterranean', doSearch: false},
      {id: 'c10', cuisineType: 'African', doSearch: false},
      {id: 'c11', cuisineType: 'Peruvian', doSearch: false},
      {id: 'c12', cuisineType: 'Vietnamese', doSearch: false}
    ],
    foodList: [
      {id: 'f1', foodType: 'Burgers', doSearch: false},
      {id: 'f2', foodType: 'Pizza', doSearch: false},
      {id: 'f3', foodType: 'Wings', doSearch: false},
      {id: 'f4', foodType: 'BBQ', doSearch: false},
      {id: 'f5', foodType: 'Noodles', doSearch: false},
      {id: 'f6', foodType: 'Rice', doSearch: false}
    ],
    distance: 10
  }

  render() {
    return (
      <div className="App">
        <Container>
          <header>What Should I Eat?</header>
          <Row>
            <Col>
              <Card bg="light" border="light" style={{ width: '18rem' }}>
                <Card.Header>Cuisine</Card.Header>
                <Card.Body>
                  <Card.Title>Which cuisines are you in the mood for?</Card.Title>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox></InputGroup.Checkbox>
                      <InputGroup.Text>Japanese</InputGroup.Text>
                    </InputGroup.Prepend>
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox></InputGroup.Checkbox>
                      <InputGroup.Text>Korean</InputGroup.Text>
                    </InputGroup.Prepend>
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox></InputGroup.Checkbox>
                      <InputGroup.Text>Chinese</InputGroup.Text>
                    </InputGroup.Prepend>
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox></InputGroup.Checkbox>
                      <InputGroup.Text>Thai</InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg="light" border="light" style={{ width: '18rem' }}>
                <Card.Header>Foods</Card.Header>
                <Card.Body>
                  <Card.Title>What kind of food are you in the mood for?</Card.Title>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox></InputGroup.Checkbox>
                      <InputGroup.Text>Burgers</InputGroup.Text>
                    </InputGroup.Prepend>
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox></InputGroup.Checkbox>
                      <InputGroup.Text>Pizza</InputGroup.Text>
                    </InputGroup.Prepend>
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox></InputGroup.Checkbox>
                      <InputGroup.Text>BBQ</InputGroup.Text>
                    </InputGroup.Prepend>
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox></InputGroup.Checkbox>
                      <InputGroup.Text>Noodles</InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Button variant="success">Search</Button>
        </Container>
      </div>
    );
  }
}

export default App;
