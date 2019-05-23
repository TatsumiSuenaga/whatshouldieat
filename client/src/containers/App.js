import React, {Component} from 'react';
import './App.css';
import SearchItem from '../models/searchItem';
import SearchCriteriaPanel from '../components/SearchCriteriaPanel';

//Bootstrap
import {Button, Container, Card, Row, Col, InputGroup} from 'react-bootstrap';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      serverResponse: '',
      searchList: [
        new SearchItem('Japanese'),
        new SearchItem('Korean'),
        new SearchItem('Indian'),
        new SearchItem('Chinese'),
        new SearchItem('Thai'),
        new SearchItem('Mexican'),
        new SearchItem('Italian'),
        new SearchItem('Vietnamese'),
        new SearchItem('Burgers'),
        new SearchItem('Pizza'),
        new SearchItem('Wings'),
        new SearchItem('BBQ')
      ],
      distance: 10,
      selectedAll: false
    }
  }

  doSearchHandler = (event, id) => {
    const itemId = this.state.searchList.findIndex(item => {
      return item.id === id;
    });

    const searchItem = {
      ...this.state.searchList[itemId]
    };

    searchItem.doSearch = !searchItem.doSearch;
    const searchList = [...this.state.searchList];
    searchList[itemId] = searchItem;

    console.log(searchItem.doSearch);

    this.setState((prevState, props) => {
      return {
        searchList: searchList
      };
    });
  }

  toggleSelectAllHandler = (event) => {
    const searchList = [...this.state.searchList];
    searchList.forEach((searchItem) => {
      searchItem.doSearch = !searchItem.doSearch;
    });

    this.setState({
      selectedAll: !this.state.selectedAll,
      searchList: searchList
    });
  }

  callServer() {
    fetch('http://localhost:9000/restaurantSearch')
      .then(res => res.text())
      .then(res => this.setState({ serverResponse: res }));
  }

  componentWillMount() {
    this.callServer();
  }

  render() {
    return (
      <div className="App">
        <Container>
          <header>What Should I Eat?</header>
          <Row>
            <Col>
              <Card bg="light" border="light">
                {/* <Card.Header>Search Criteria</Card.Header> */}
                <Card.Body>
                  {/* <Card.Title>What are you in the mood for?</Card.Title> */}
                  <InputGroup>
                    <SearchCriteriaPanel 
                      searchList={this.state.searchList}
                      changed={this.doSearchHandler}/>
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Button variant="success">Search</Button>
            <Button variant="warning">Randomize</Button>
            <Button 
              variant="primary"
              onClick={(event) => {this.toggleSelectAllHandler()}}>
                {!this.state.selectedAll ? <span>Select All</span> : <span>Unselect All</span>}</Button>
          </Row>
          <Row><p>{this.state.serverResponse}</p></Row>
          
        </Container>
      </div>
    );
  }
}

export default App;
