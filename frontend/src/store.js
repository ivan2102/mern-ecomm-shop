import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
     productReducer,
      productDetailsReducer,
       productDeleteReducer,
        productCreateReducer,
        updateProductReducer,
        productReviewsReducer,
        productTopRatedReducer
     } from './reducers/productReducer';

import { cartReducer } from './reducers/cartReducer';

import { 
    userLoginReducer,
     userRegisterReducer, 
     userDetailsReducer,
      userUpdateProfileReducer,
       userListReducer,
       deleteUserReducer,
       updateUserReducer 
     } 
     from './reducers/userReducer';

import { orderReducer,
     orderDetailsReducer,
      orderPayReducer,
       myOrdersProfileReducer,
       ordersListReducer,
       orderDeliverReducer
    } from './reducers/orderReducer';


const reducer = combineReducers({

    product: productReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productReviews: productReviewsReducer,
    updateProduct: updateProductReducer,
    productTop: productTopRatedReducer,
    cart: cartReducer,
    login: userLoginReducer,
    register: userRegisterReducer,
    details: userDetailsReducer,
    updateProfile: userUpdateProfileReducer,
    updateUser: updateUserReducer,
    userList: userListReducer,
    deleteUser: deleteUserReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    myOrdersProfile: myOrdersProfileReducer,
    ordersList: ordersListReducer
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {

    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    login: { userInfo: userInfoFromStorage },
    
}




const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;