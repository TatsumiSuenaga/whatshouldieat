import React, { Component } from 'react';

import {Form} from 'react-bootstrap';

class SearchCriteriaItem extends Component {

  render() {
      return (
          <Form.Check
            inline
            type="checkbox"
            id="default-checkbox"
            label={this.props.searchScreen}
            onChange={this.props.change}
            checked={this.props.searchValue} />
      )
  }
}

export default SearchCriteriaItem;