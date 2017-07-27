"use strict";

//
export function booksReducers(state={
    books:
    [
        {
            _id: 1,
            title: 'book title',
            description: 'book description',
            price: 100.00
        },
        {
            _id: 2,
            title: '2nd book title',
            description: '2nd book description',
            price: 15.00
        }
    ]
}, action){
    switch(action.type){
        case "GET_BOOKS":
            return {...state, books:[...state.books]};
            break;
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
                    return book._id === action.payload._id;
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
                    return book._id === action.payload._id;
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