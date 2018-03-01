'use strict';
/* global store */
const store = (function() {
  return {
    bookmarks: [], //id, title, rating, expanded
    adding: false
  };
}());