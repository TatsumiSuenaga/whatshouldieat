import React from 'react';
import SearchResultItem from './SearchResultItem.jsx';

import { Col } from 'react-bootstrap';

export default ({ searchResults}) =>  (
  searchResults.map((searchResultItem) => {
    return (
      <Col style={{margin: '10px 0'}} key={searchResultItem.id}>
        <SearchResultItem
          restaurant={searchResultItem}/>
      </Col>
    );
  })
)