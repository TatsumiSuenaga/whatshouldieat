import React from 'react';
import SearchCriteriaItem from './SearchCriteriaItem.jsx';

export default ({ searchList, changed }) => (
  searchList.map((searchItem) => {
      return (
        <SearchCriteriaItem
          searchScreen={searchItem.searchScreen}
          searchValue={searchItem.doSearch}
          key={searchItem.id}
          change={(event) => changed(event, searchItem.id)} />
      )
    })
)