import React from 'react';

import SearchResultItemPanel from './SearchResultItemPanel.jsx';

//Bootstrap
import { Row, Button } from 'react-bootstrap';

const SearchResultsPanel = (props) => {
    let panel = <p>{props.serverResponse}</p>;

    if(props.searchResults.length > 0) {
        panel = (
          <Row>
            <SearchResultItemPanel searchResults={props.searchResults}/>
          </Row>
        );
    }
    return (
      <>
        {panel}
        <Button
            style={{marginTop: '20px'}}
            onClick={props.resetSearchScreenHandler}>Search Again!</Button>
      </>
    );
};

export default SearchResultsPanel;