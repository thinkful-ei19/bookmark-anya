/* global bookmarkList, api, store, $ */
'use strict';
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
            <input type="submit" value="Submit">
            </form> 
                    `;
    return newForm;
  };


  const generateNewItems = function (bookmark) {

    if (bookmark.expanded === false) {
      return `
        <li class="bookmark-item" data-item-id="${bookmark.id}>
            <header>
                <span class="header-text">${bookmark.title}</span>
            </header>
            <div class="rating">
            ${bookmark.rating}
            </div>
            <button class="item-toggle js-item-toggle">
            <span class="button-label">Expand</span>
          </button>
            <button class="item-delete js-item-delete">
            <span class="button-label">Delete</span>
          </button>
        </li>
            `;
    }
    else {
      return `
            <li class="bookmark-item" data-item-id="${bookmark.id}>
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
                <a href="${bookmark.url}">Read It!</a>
            </div>
        </li>`;
    }
  };

  const generateBookmarksListString = function (list) {
    const bookmarks = list.map((bookmark) => generateNewItems(bookmark));
    return bookmarks.join('');
  };

  const render = function () {
    let items = store.bookmarks;
    //render to the DOM
    const listString = generateBookmarksListString(items);
    //1. takes care of minimum rating
    //2. takes care of expanded or not

    //3. display new form
    // const newFormDisplay = generateNewItemForm()
    if (store.adding === true) {
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
    return $(item).parents('li').data('item-id');
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
        store.addItem(newItem);
        render();
      });            
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
    $('.results').on('click', '.js-item-toggle', function (event) {
      const id = getIdFromElement(event.currentTarget);
      store.toggleExpandedOrNot(id);
      render();
    });
  };

  //   function addItemToShoppingList(itemName) {
  //     try {
  //       Item.validateName(itemName);
  //       const results = Item.create(itemName);
  //       store.items.push(results);
  //       render();
  //     } catch(e) {
  //       console.log(`Cannot add item: ${e.message}`);
  //     }
  //   }

  //   function handleNewItemSubmit() {
  //     $('#js-shopping-list-form').submit(function (event) {
  //       event.preventDefault();
  //       const newItemName = $('.js-shopping-list-entry').val();
  //       $('.js-shopping-list-entry').val('');
  //       addItemToShoppingList(newItemName);
  //       render();
  //     });
  //   }


  //   const toggleFormPresence = function() {

  //   }

  const handleDeleteItem = function () {
    $('.results').on('click', '.js-item-delete', function (event) {
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
  };

  return {
    render,
    bindEventListeners
  };
}());
