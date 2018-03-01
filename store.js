'use strict';
/* global store, cuid */
const store = (function() {
  let bookmarks = [
    {id: cuid(), title:  'Bear', rating: 0, description: 'lorem epsum', url: '/', expanded: false},
    {id: cuid(), title:  'Fox', rating: 0, description: 'lorem epsum', url: '/', expanded: true},
    {id: cuid(), title:  'Wolf', rating: 0, description: 'lorem epsum', url: '/', expanded: false},
    {id: cuid(), title:  'Cat', rating: 0, description: 'lorem epsum', url: '/', expanded: false}  
  ];
  return {
    bookmarks, //id, title, rating, expanded
    adding: false
  };
}());