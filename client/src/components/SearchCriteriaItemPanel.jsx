import React, { PureComponent } from 'react';
import SearchCriteriaItem from './SearchCriteriaItem.jsx';

class SearchCriteriaItemPanel extends PureComponent {
  render() {
    return this.props.searchList.map((searchItem) => {
      return (
        <SearchCriteriaItem
          searchScreen={searchItem.searchScreen}
          searchValue={searchItem.doSearch}
          key={searchItem.id}
          change={(event) => this.props.changed(event, searchItem.id)} />
      );
    })
  }
}

export default SearchCriteriaItemPanel;