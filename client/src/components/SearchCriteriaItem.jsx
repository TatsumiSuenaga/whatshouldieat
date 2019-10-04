import React from 'react';

import {Form} from 'react-bootstrap';

export default (props) => (
  <Form.Check
    inline
    type="checkbox"
    id="default-checkbox"
    label={props.searchScreen}
    onChange={props.change}
    checked={props.searchValue} />
)