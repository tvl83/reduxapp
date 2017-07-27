"use strict";

// POST
export function postBooks(book){
    return {
        type:"POST_BOOK",
        payload: book
    }
}

// DELETE
export function deleteBooks(id){
    return {
        type: "DELETE_BOOK",
        payload: id
    }
}

// UPDATE
export function updateBooks(book){
    return {
        type:"UPDATE_BOOK",
        payload: book
    }
}