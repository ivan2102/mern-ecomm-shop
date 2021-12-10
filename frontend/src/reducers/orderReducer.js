
const initialState = {

    orderItems: [],
    shippingAddress: {},
    orders: [],
    loading: true
}

export const orderReducer = (state = {}, action) => {

    switch (action.type) {

        case 'ORDER_REQUEST':

        return {

            loading: true
        }

        case 'ORDER_SUCCESS':

        return {

            order: action.payload,
            success: true,
            loading: false
        }

        case 'ORDER_FAIL':

        return {

            error: action.payload,
            loading: false
        }

       

        default:

        return state;


    }
}


export const orderDetailsReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'ORDER_DETAILS_REQUEST':

            return {
    
                ...state,
                loading: true
            }
    
            case 'ORDER_DETAILS_SUCCESS':
    
            return {
    
                order: action.payload,
                loading: false
            }
    
            case 'ORDER_DETAILS_FAIL':
    
            return {
    
                error: action.payload,
                loading: false
            }

       default:

       return state;
    }
}


export const orderPayReducer = (state = {}, action) => {

    switch (action.type) {

        case 'ORDER_PAY_REQUEST':

        return {

            loading: true
        }

        case 'ORDER_PAY_SUCCESS':

        return {

            success: true,
            loading: false
        }

        case 'ORDER_PAY_FAIL':

        return {

            error: action.payload,
            loading: false
        }

        case 'ORDER_PAY_RESET':

        return {}

        default:

        return state;
    }
}


export const orderDeliverReducer = (state = {}, action) => {

    switch(action.type) {

         case 'ORDER_DELIVER_REQUEST':

         return {

            loading: true
         }

         case 'ORDER_DELIVER_SUCCESS':

         return {

            success: true,
            loading: true
         }

         case 'ORDER_DELIVER_FAIL':

         return {

            error: action.payload,
            loading: false
         }

         case 'ORDER_DELIVER_RESET':

         return {}

         default:

         return state;
    }
}

export const myOrdersProfileReducer = (state = initialState, action) =>  {

    switch (action.type) {

        case 'MY_ORDERS_PROFILE_PAGE_REQUEST':

        return {

            loading: true
        }

        case 'MY_ORDERS_PROFILE_PAGE_SUCCESS':

        return {

            orders: action.payload,
            loading: false
        }

        case 'MY_ORDERS_PROFILE_PAGE_FAIL':

        return {

            error: action.payload,
            loading: false
        
        }

        case 'MY_ORDERS_PROFILE_PAGE_RESET':

        return {

            orders: []
        }

        default:

        return state;
    }
}

export const ordersListReducer = (state = { orders: [] }, action) => {

    switch(action.type) {

        case 'ORDER_LIST_REQUEST':

        return {

            loading: true
        }

        case 'ORDER_LIST_SUCCESS':

        return {

            orders: action.payload,
            loading: false
        }

        case 'ORDER_LIST_FAIL':

        return {

            error: action.payload,
            loading: false
        }

        default:

        return state;


    }
}