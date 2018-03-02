/* global bookmarkList, store, api, $ */
'use strict';
// When DOM is ready:
$(function () {
  bookmarkList.bindEventListeners();
  bookmarkList.render();

  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    bookmarkList.render();
  });

});

$.getJSON('https://thinkful-list-api.herokuapp.com/ei-student/items', (response) => {
  console.log('api response:', response);
})