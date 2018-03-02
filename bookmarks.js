/* global bookmarkList, api, store */
'use strict';
const bookmarkList = (function() {

  const generateNewItemForm = function() {
    newForm = `
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
                <option value="star">
                    <span>&#x2605</span>
                </option>
                <option value="star">
                    <span>&#x2605</span><span>&#x2605</span>
                </option>
                <option value="star">
                        <span>&#x2605</span><span>&#x2605</span><span>&#x2605</span>
                </option>
                <option value="star">
                        <span>&#x2605</span><span>&#x2605</span><span>&#x2605</span><span>&#x2605</span>
                </option>
                <option value="star">
                        <span>&#x2605</span><span>&#x2605</span><span>&#x2605</span><span>&#x2605</span><span>&#x2605</span>
                </option>
                </select>
            <br><br>
            <input type="submit" value="Submit">
            </form> 
                    `;
    return newForm;
  };


  const generateNewItems = function(bookmark) {
        
    if (bookmark.expanded === false) {
      return `
        <li class="bookmark-item" data-item-id="${bookmark.id}>
            <header>
                <span class="header-text">${bookmark.title}</span>
            </header>
            <div class="rating">
            ${bookmark.rating}
            </div>
            <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
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

  const generateBookmarksListString = function(list) {
    const bookmarks = list.map((bookmark) => generateNewItems(bookmark));
    return bookmarks.join('');
  };

  const render = function() {
    let items = store.bookmarks;
    //render to the DOM
    const listString = generateBookmarksListString(items);
    //1. takes care of minimum rating
    //2. takes care of expanded or not

    //3. display new form
    // const newFormDisplay = generateNewItemForm()
    if (store.adding == true) {
        //insert above html into the DOM
        $('new-form').html(form)
        $('.results').html(listString);
        }
    else {
    //insert above html into the DOM
    $('.results').html(listString);
  };
        

  const handleNewItemSubmit = function() {
     //eventDelegation
     $('.bookmark-form').delegate('click', '#button-add-bookmark', function (event) {
        event.preventDefault();
          $(this).find('.new-form').submit(function() {
              $(event.currentTarget).submit(function() {
                const newTitle =  $(event.currentTarget).find('#title').val();
                const newLink = $(event.currentTarget).find('#link').val();
                const newDescription = $(event.currentTarget).find('#description').val();
                const newRating = $(event.currentTarget).find('#rating-new-item').val();

                $(event.currentTarget).find('#title').val('');
                $(event.currentTarget).find('#link').val('');
                $(event.currentTarget).find('#description').val('');
                $(event.currentTarget).find('#rating-new-item').val('');

                addItemToBookmarksList(newTitle, newLink, newDescription, newRating)
             });
        render();
      });                
     }
    )
  };


const addItemToBookmarksList(title, link, description, rating) {

}
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

 
  const toggleFormPresence = function() {

  }
  

  const bindEventListeners = function() {
    //handleNewItemSubmit();
  };

  return {
    render,
    bindEventListeners
  };
}());
