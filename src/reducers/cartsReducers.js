"use strict";

export function cartReducers(state={cart:[]}, action){

    switch(action.type){
        case "ADD_TO_CART":
            return {cart:[...state, ...action.payload]}
            break;
        case "UPDATE_CART":
            const currentItemToUpdate = [...state.cart];
            const indexToUpdate = currentItemToUpdate.findIndex(
                function(book){
                    return book._id === action._id;
                }
            );
            const newItemToUpdate = {
                ...currentItemToUpdate[indexToUpdate],
                quantity: currentItemToUpdate[indexToUpdate].quantity + action.unit
            };
            let cartUpdate =  [
                ...currentItemToUpdate.slice(0, indexToUpdate),
                newItemToUpdate,
                ...currentItemToUpdate.slice(indexToUpdate + 1)
            ];
            return {
                ...state,
                cart: cartUpdate
            };
            break;
        case "DELETE_CART_ITEM":
            return {cart:[...state, ...action.payload]}
            break;
    }

    return state;
}