"use strict";

//
export function booksReducers(state={books:[]}, action){
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