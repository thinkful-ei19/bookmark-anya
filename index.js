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