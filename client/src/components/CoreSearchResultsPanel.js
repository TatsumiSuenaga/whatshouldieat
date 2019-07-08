import React from 'react';

import SearchResultItemPanel from './SearchResultItemPanel';

//Bootstrap
import { Row } from 'react-bootstrap';

const coreSearchResultsPanel = (props) => {
    let panel = <p>{props.serverResponse}</p>;

    if(props.responseList.length > 0) {
        panel = <SearchResultItemPanel responseList={props.responseList}/>
    }
    return (
        <Row>{panel}</Row>
    );
};

export default coreSearchResultsPanel;