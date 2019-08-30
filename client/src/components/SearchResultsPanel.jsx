import React from 'react';

import SearchResultItemPanel from './SearchResultItemPanel.jsx';

//Bootstrap
import { Row, Button } from 'react-bootstrap';

const SearchResultsPanel = (props) => {
    let panel = null;

    if(props.searchResults.length > 0) {
        panel = (
          <Row>
            <SearchResultItemPanel searchResults={props.searchResults}/>
          </Row>
        );
    } else if (props.serverResponse.length > 0) {
      panel = <p>{props.serverResponse}</p>;
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