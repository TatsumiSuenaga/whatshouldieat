const uuid = require('uuid/v1');

function SearchItem(type) {
    this.id = uuid();
    this.searchType = type;
    this.doSearch = false;
}
export default SearchItem;