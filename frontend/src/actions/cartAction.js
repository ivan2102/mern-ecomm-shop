import { 
    ADD_CART_ITEM,
     REMOVE_CART_ITEM, 
     SHIPPING_ADDRESS,
     PAYMENT_METHOD
    } 
     from "./types";
import axios from 'axios';

// Add to Cart
export const addToCart = (id, quantity) => async (dispatch, getState) => {

    try {

        const res = await axios.get(`/api/products/${id}`);

        dispatch({

            type: ADD_CART_ITEM,
            payload: {

                product: res.data._id,
                name: res.data.name,
                image: res.data.image,
                price: res.data.price,
                countInStock: res.data.countInStock,
                quantity
            }
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        
    } catch (error) {


        
    }


}

// Remove Cart
export const removeCart = (id) => (dispatch, getState) => {

    dispatch({

        type: REMOVE_CART_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


//Shipping Address
export const saveShippingAddress = (data) => (dispatch) => {

    dispatch({

        type: SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('data', JSON.stringify('data'));
}

// Payment Method
export const savePaymentMethod = (paymentMethod) => dispatch => {

    dispatch({

        type: PAYMENT_METHOD,
        payload: paymentMethod
    })

    localStorage.setItem('paymentMethod', JSON.stringify('paymentMethod'));
}