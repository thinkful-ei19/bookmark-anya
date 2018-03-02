'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function() {

  const addItem = function(item) {
    this.bookmarks.push(item);
  };

  const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
   
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };
  //if I have time :)
  // const toggleCheckedAdding = function() {
  //   this.adding = !this.adding;
  // };

  const toggleExpandedOrNot = function(id) {
    const item = this.bookmarks.find(item => item.id === id);
    item.expanded = !item.expanded;
  };

  const minRatingFilter = function(rating) {
    if (rating === 'none') {
      this.minRating = null;
    } else {
      this.minRating = rating;
    }
  };

  return {
    bookmarks: [], //id, title, rating, expanded
    adding: false,
    expanded: false,
    minRating: null,
    addItem,
    findById,
    findAndDelete,
    //toggleCheckedAdding,
    toggleExpandedOrNot,
    minRatingFilter

  };
}());