import React from 'react';

import SearchResultItemPanel from './SearchResultItemPanel';

//Bootstrap
import { Row, Col, Button } from 'react-bootstrap';

const SearchResultsPanel = (props) => {
    let panel = <p>{props.serverResponse}</p>;

    if(props.searchResults.length > 0) {
        panel = <SearchResultItemPanel searchResults={props.searchResults}/>;
            
    }
    return (
        <Row>
            <Col>
                {panel}
                <Button
                    style={{marginTop: '20px'}}
                    onClick={props.resetSearchScreenHandler}>Search Again!</Button>
            </Col>
        </Row>
    );
};

export default SearchResultsPanel;