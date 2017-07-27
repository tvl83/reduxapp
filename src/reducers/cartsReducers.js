"use strict";

export function cartReducers(state={cart:[]}, action){

    switch(action.type){
        case "ADD_TO_CART":
            return {
                cart:[...state, ...action.payload],
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            };

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
                cart: cartUpdate,
                totalAmount: totals(cartUpdate).amount,
                totalQty: totals(cartUpdate).qty
            };
            break;
        case "DELETE_CART_ITEM":
            return {
                cart:[...state, ...action.payload],
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            };
            break;
    }

    return state;
}

export function totals(payloadArr){
    const totalAmount = payloadArr.map(function(cartArr){
        return cartArr.price * cartArr.quantity;
    }).reduce(function(a, b){
        return a+b;
    }, 0);

    const totalQty = payloadArr.map(function(cartArr){
        return cartArr.quantity;
    }).reduce(function(a,b){
        return a+b;
    }, 0);

    return {amount: totalAmount.toFixed(2), qty: totalQty };
}

