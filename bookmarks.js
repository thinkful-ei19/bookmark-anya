/* global bookmarkList, api, store, $ */
'use strict';
// eslint-disable-next-line no-unused-vars
const bookmarkList = (function () {

  const generateNewItemForm = function () {
    let newForm = `
            <form class="new-form">
            Title:<br>
                <input type="text" name="title" id="title" value="title">
            <br>
            Link:<br>
                <input type="text" name="link" id="link" value="link">
            <br>
            Description:<br>
                <input type="text" name="description" id="description" value="description">
            <br>
            Rating:<br>
                <select name="Rating" id="rating-new-item" >
                <option value="1">
                    <span>&#x2605</span>
                </option>
                <option value="2">
                    <span>&#x2605</span><span>&#x2605</span>
                </option>
                <option value="3">
                        <span>&#x2605</span><span>&#x2605</span><span>&#x2605</span>
                </option>
                <option value="4">
                        <span>&#x2605</span><span>&#x2605</span><span>&#x2605</span><span>&#x2605</span>
                </option>
                <option value="5">
                        <span>&#x2605</span><span>&#x2605</span><span>&#x2605</span><span>&#x2605</span><span>&#x2605</span>
                </option>
                </select>
            <br><br>
            <div class="item__buttons">
            <input type="submit" id="form-submit-button" value="Submit">
            <input type="submit" id="form-cancel-button" value="Cancel">
            </div>
            </form>
                    `;
    return newForm;
  };


  const generateNewItems = function (bookmark) {

<<<<<<< HEAD
    if (!bookmark.expanded) {
=======
    if (bookmark.expanded === false) {
>>>>>>> 33186ea761423bfcdb9c0938054b0337e783ea7f
      return `
        <li class="bookmark-item js-item-element" data-item-id="${bookmark.id}">
            <header>
                <span class="header-text">${bookmark.title}</span>
            </header>
            <div class="rating">
            ${bookmark.rating}
            </div>
            <button class="item-toggle js-button-toggle css-item">
            <span class="button-label">Expand</span>
          </button>
            <button class="item-delete js-button-delete css-item">
            <span class="button-label">Delete</span>
          </button>
        </li>
            `;
    }
    else {
      return `
            <li class="bookmark-item js-item-element" data-item-id="${bookmark.id}">
            <header>
                <span class="header-text">${bookmark.title}</span>
            </header>
            <article>
                <p class="desciption">
                    ${bookmark.description}
                </p>
            </article>
            <div class="rating">
            ${bookmark.rating}
            </div>
            <div class="visit-site">
                <p>
                <a href="${bookmark.url}">Read It!</a>
                </p>
            </div>
            <button class="item-toggle js-button-toggle css-item">
            <span class="button-label">Shrink</span>
          </button>
            <button class="item-delete js-button-delete css-item">
            <span class="button-label">Delete</span>
          </button>
        </li>`;
    }
  };

  const generateBookmarksListString = function (list) {
    const bookmarks = list.map((bookmark) => generateNewItems(bookmark));
    return bookmarks.join('');
  };

  const render = function () {
    let items = store.bookmarks;
    const listString = generateBookmarksListString(items);

    //1. takes care of minimum rating
    let filtered = [];
    if (store.minRating) {
      console.log(store.bookmarks, store.minRating);
      filtered = store.bookmarks.filter(bookmark => bookmark.rating >= store.minRating);
      
      const filteredBookmarks = filtered.map(generateNewItems);
      console.log(filteredBookmarks);
      $('.results').empty();
      $('.results').html(filteredBookmarks);
    }
      
    

    //3. display new form
    // const newFormDisplay = generateNewItemForm()
    else if (store.adding === true) {
      //insert above html into the DOM
      let formHTML = generateNewItemForm();
      $('.bookmark-form').html(formHTML);
    }
    else {
      //insert above html into the DOM
      $('.bookmark-form').empty();
      $('.results').html(listString);
    }
  };


  const getIdFromElement = function (item) {
    return $(item).closest('.js-item-element').data('item-id');
  };

  const handleNewItemSubmit = function() {
    //eventDelegation
    //hide buttons
    //handling a form to the page, handle 
    $('.bookmark-form').on('submit', '.new-form',function (event) {
      event.preventDefault();

      const title =  $(event.target).find('#title').val();
      const url = $(event.target).find('#link').val();
      const desc = $(event.target).find('#description').val();
      const rating = $(event.target).find('#rating-new-item').val();
      const newData = {title, url, desc, rating};

      $(event.target).find('#title').val('');
      $(event.target).find('#link').val('');
      $(event.target).find('#description').val('');
      $(event.target).find('#rating-new-item').val('');

      api.createItem(newData, (newItem) => {
        store.adding = false;
        newItem.expanded = false;
        store.addItem(newItem);
        render();
      });            
    });
  };

  const handleCancelNewItemSubmit = function() {
    $('.bookmark-form').on('click', '#form-cancel-button', function(event){
      event.preventDefault();
      store.adding = false;
      render();
    });
  };

  const handleAddBookmarkForm = function () {
    $('.add-bookmark-form').on('submit', function (event) {
      event.preventDefault();
      store.adding = true;
      render();
    });
  };

  const handleToggleDetailedBookmark = function () {
    $('.results').on('click', '.js-button-toggle', function (event) {
      const id = getIdFromElement(event.currentTarget);
      store.toggleExpandedOrNot(id);

      render();
    });
  };

  const handleFilterByMinRating = function() {
    $('#rating-bookmark').click(function(event) {
      console.log(event);
      event.preventDefault();
      const filteredRating = $('#select-rating-bookmark').val();
      console.log(filteredRating);
      store.minRatingFilter(filteredRating);
      render();
    });
  };

  const handleDeleteItem = function () {
    $('.results').on('click', '.js-button-delete', function (event) {
      console.log('delete function activated');
      const id = getIdFromElement(event.currentTarget);
      api.deleteItem(id, function () {
        store.findAndDelete(id);
        render();
      });
    });
  };


  const bindEventListeners = function () {
    handleNewItemSubmit();
    handleAddBookmarkForm();
    handleCancelNewItemSubmit();
    handleFilterByMinRating();
    handleDeleteItem();
    handleToggleDetailedBookmark();
  };

  return {
    render,
    bindEventListeners
  };
}());
