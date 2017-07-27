"use strict";

import {createStore} from 'redux';

// step 3 define reducers
const reducer = function(state={books:[]}, action){
    switch(action.type){
        case "POST_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {books: [...state.books, ...action.payload]};
            break;
        case "DELETE_BOOK":
            // create copy of the current array of books
            const currentBookToDelete = [...state.books];
            // find at which index in books array is the book to be deleted.
            const indexToDelete = currentBookToDelete.findIndex(
                function(book){
                    return book.id === action.payload.id;
                }
            );
            // use slice to remove the book at the specified index
            return {books:[ ...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]};
            break;
        case "UPDATE_BOOK":
            // create copy of array
            const currentBookToUpdate = [...state.books];
            // find index of book to update
            const indexToUpdate = currentBookToUpdate.findIndex(
                function(book){
                    return book.id === action.payload.id;
                }
            );
            // create new book object with new values and with the same array index of the item we want to replace
            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title
            };

            console.log('newBookToUpdate: ', newBookToUpdate);
            return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]};
            break;
    }

    return state;
};

// step 1 create store
const store = createStore(reducer);

store.subscribe(function(){
     console.log('current state is: ', store.getState());
     // console.log('current price: ', store.getState()[1].price);
});

//step 2 create and dispatch actions
store.dispatch({type:"POST_BOOK", payload:
    [
        {
            id: 1,
            title: 'book title',
            description: 'book description',
            price: 100.00
        },
        {
            id: 2,
            title: '2nd book title',
            description: '2nd book description',
            price: 15.00
        }
    ]
});

store.dispatch({type:"POST_BOOK", payload:
    [
        {
            id: 3,
            title: '3rd book title',
            description: '3rd book description',
            price: 1.00
        }
    ]
});

store.dispatch({type:"DELETE_BOOK", payload:
    {
        id: 1
    }
});

store.dispatch({
    type:"UPDATE_BOOK",
    payload:{
        id:2,
        title:'Learn React'
    }
})