/* global bookmarkList */
'use strict';
// When DOM is ready:
$(function () {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
});

$.getJSON('https://thinkful-list-api.herokuapp.com/ei-student/items', (response) => {
  console.log('api response:', response);
})