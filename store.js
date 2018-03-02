'use strict';
/* global store, cuid */
const store = (function() {
  let bookmarks = [
    {id: cuid(), title:  'Bear', rating: 0, description: 'lorem epsum', url: '/', },
    {id: cuid(), title:  'Fox', rating: 0, description: 'lorem epsum', url: '/', },
    {id: cuid(), title:  'Wolf', rating: 0, description: 'lorem epsum', url: '/', },
    {id: cuid(), title:  'Cat', rating: 0, description: 'lorem epsum', url: '/', }  
  ];

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
    item.expanded = !item.isExpanded;
  };

  return {
    bookmarks, //id, title, rating, expanded
    adding: false,
    expanded: false,
    addItem,
    findById,
    findAndDelete,
    //toggleCheckedAdding,
    toggleExpandedOrNot

  };
}());