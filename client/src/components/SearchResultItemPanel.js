import React, { PureComponent } from 'react';
import SearchResultItem from './SearchResultItem';

class SearchResultItemPanel extends PureComponent {
  render() {
    return this.props.responseList.map((searchResultItem) => {
      return (
        <SearchResultItem
          restaurant={searchResultItem}
          key={searchResultItem.id}/>
      );
    })
  }
}

export default SearchResultItemPanel;