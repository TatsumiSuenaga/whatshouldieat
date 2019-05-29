import React, { PureComponent } from 'react';
import SearchCriteriaItem from './SearchCriteriaItem';

class SearchCriteriaPanel extends PureComponent {
  render() {
    return this.props.searchList.map((searchItem) => {
      return (
        <SearchCriteriaItem
          searchType={searchItem.searchType}
          searchValue={searchItem.doSearch}
          key={searchItem.id}
          change={(event) => this.props.changed(event, searchItem.id)} />
      );
    })
  }
}

export default SearchCriteriaPanel;