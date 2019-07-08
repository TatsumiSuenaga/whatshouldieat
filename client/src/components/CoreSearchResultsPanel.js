import React from 'react';

import SearchResultItemPanel from './SearchResultItemPanel';

//Bootstrap
import { Row, Col, Button } from 'react-bootstrap';

const coreSearchResultsPanel = (props) => {
    let panel = <p>{props.serverResponse}</p>;

    if(props.responseList.length > 0) {
        panel = <SearchResultItemPanel responseList={props.responseList}/>;
            
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

export default coreSearchResultsPanel;