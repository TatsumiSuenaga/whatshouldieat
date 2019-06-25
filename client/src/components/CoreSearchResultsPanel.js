import React from 'react';

//Bootstrap
import { Row } from 'react-bootstrap';

const coreSearchResultsPanel = (props) => {
    return (
        <Row><p>{props.serverResponse}</p></Row>
    );
};

export default coreSearchResultsPanel;