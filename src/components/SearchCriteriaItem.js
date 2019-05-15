import React, { Component } from 'react';

import {InputGroup} from 'react-bootstrap';

class SearchCriteriaItem extends Component {

  render() {
      return (
        <InputGroup.Prepend>
          <InputGroup.Checkbox 
            onChange={this.props.change}
            checked={this.props.searchValue} ></InputGroup.Checkbox>
          <InputGroup.Text>{this.props.searchType}</InputGroup.Text>
        </InputGroup.Prepend>
      )
  }
}

export default SearchCriteriaItem;