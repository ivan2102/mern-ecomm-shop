

const initialState = {

    cartItems: [],
    shippingAddress: {},
    paymentMethod: {}
}

export const cartReducer = (state = initialState, action) => {

    switch (action.type) {
  
      case 'ADD_CART_ITEM':

      const cartItem = action.payload;

      const existItem = state.cartItems.find(item => item.product === cartItem.product);

      if(existItem) {

        return {

            ...state,
            cartItems: state.cartItems.map(item => item.product === existItem.product ? cartItem : item)
        }


      }else {

        return {

            ...state,
            cartItems: [...state.cartItems, cartItem]
        }


      }

      case 'REMOVE_CART_ITEM':

      return {

        ...state,
        cartItems: state.cartItems.filter(item => item.product !== action.payload)
      }

      case 'SHIPPING_ADDRESS':

      return {

        ...state,
        shippingAddress: action.payload
      }

      case 'PAYMENT_METHOD':

      return {

        ...state,
        paymentMethod: action.payload
      }

      default:

      return state;
    }
  
  }


  