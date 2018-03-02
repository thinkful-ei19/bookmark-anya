'use strict';
/* global store, cuid */
const store = (function() {
  let bookmarks = [
    {id: cuid(), title:  'Bear', rating: 0, description: 'lorem epsum', url: '/', expanded: false},
    {id: cuid(), title:  'Fox', rating: 0, description: 'lorem epsum', url: '/', expanded: true},
    {id: cuid(), title:  'Wolf', rating: 0, description: 'lorem epsum', url: '/', expanded: false},
    {id: cuid(), title:  'Cat', rating: 0, description: 'lorem epsum', url: '/', expanded: false}  
  ];

  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
   
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const toggleCheckedAdding = function() {
    this.adding = !this.adding;
  };

  return {
    bookmarks, //id, title, rating, expanded
    adding: false,
    addItem,
    findById,
    findAndDelete,
    toggleCheckedAdding
  };
}());