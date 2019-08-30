import React, { PureComponent } from 'react';
import SearchResultItem from './SearchResultItem.jsx';

import { Col } from 'react-bootstrap';

class SearchResultItemPanel extends PureComponent {
  render() {
    return this.props.searchResults.map((searchResultItem) => {
      return (
        <Col style={{margin: '10px 0'}} key={searchResultItem.id}>
          <SearchResultItem
            restaurant={searchResultItem}/>
        </Col>
      );
    })
  }
}

export default SearchResultItemPanel;