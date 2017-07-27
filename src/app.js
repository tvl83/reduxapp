"use strict";

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

import reducers from './reducers/index';

import { addToCart } from "./actions/cartsActions";
import { postBooks, deleteBooks, updateBooks } from "./actions/booksActions";

// step 1 create store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

// store.subscribe(function(){
//      console.log('current state is: ', store.getState());
//      // console.log('current price: ', store.getState()[1].price);
// });

//step 2 create and dispatch actions
store.dispatch(postBooks(
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
));

store.dispatch(deleteBooks( { id: 1 } ));

store.dispatch(updateBooks(
    {
        id:2,
        title:'Learn React'
    }
));

// -->> CART ACTIONS <<--
// add to cart
store.dispatch(addToCart([{id: 1}]));