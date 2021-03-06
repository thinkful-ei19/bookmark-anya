'use strict';
const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/anya/bookmarks';
  
  const getItems = function(callback) {
    $.getJSON(BASE_URL, callback);
  };
  
  const createItem = function(data, callback) {
    const settings = {
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: callback
    };
  
    $.ajax(settings);
  };
  
  
  const deleteItem = function(id, callback) {
    const settings = {
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      // contentType: 'application/json',
      // data: '',
      success: callback
    };
  
    $.ajax(settings);
  };
  
  return {
    getItems,
    createItem,
    deleteItem
  };
  
}());