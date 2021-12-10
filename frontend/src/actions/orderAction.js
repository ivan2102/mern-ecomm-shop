import { 
    ORDER_REQUEST,
     ORDER_SUCCESS,
      ORDER_FAIL,
      ORDER_DETAILS_SUCCESS,
       ORDER_DETAILS_FAIL,
        ORDER_DETAILS_REQUEST, 
        ORDER_PAY_FAIL,
        ORDER_PAY_REQUEST,
        ORDER_PAY_SUCCESS,
        MY_ORDERS_PROFILE_PAGE_FAIL,
        MY_ORDERS_PROFILE_PAGE_REQUEST,
        MY_ORDERS_PROFILE_PAGE_SUCCESS,
        ORDER_LIST_FAIL,
        ORDER_LIST_REQUEST,
        ORDER_LIST_SUCCESS,
        ORDER_DELIVER_REQUEST,
        ORDER_DELIVER_FAIL,
        ORDER_DELIVER_SUCCESS
    } 
        from "./types";
import axios from 'axios';

// Create Order
export const createOrder = (order) => async (dispatch, getState) => {

    try {

        dispatch({

            type: ORDER_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const res = await axios.post('/api/orders', order, config);

        dispatch({

            type: ORDER_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {

        dispatch({

            type: ORDER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}

// Order Details
export const getOrderDetails = (id) =>  async (dispatch, getState) => {

    try {

        dispatch({

            type: ORDER_DETAILS_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.get(`/api/orders/${id}`, config);

        dispatch({

            type: ORDER_DETAILS_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {

        dispatch({

            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}


// Pay Order
export const getOrderPaid = (orderId, paymentResult) => async (dispatch, getState) => {

    try {

        dispatch({

            type: ORDER_PAY_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

        dispatch({

            type: ORDER_PAY_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {

        dispatch({

            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}


export const orderDeliveryAction = (order) => async (dispatch, getState) => {

    try {

        dispatch({

            type: ORDER_DELIVER_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        dispatch({

            type: ORDER_DELIVER_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {

        dispatch({

            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}


export const getOrdersOnProfile = () => async (dispatch, getState) => {

    try {

        dispatch({

            type: MY_ORDERS_PROFILE_PAGE_REQUEST 
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.get(`/api/orders/myorders`, config);

        dispatch({

            type: MY_ORDERS_PROFILE_PAGE_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {

        dispatch({

            type: MY_ORDERS_PROFILE_PAGE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}

export const displayOrdersAction = () => async (dispatch, getState) => {

    try {

        dispatch({

            type: ORDER_LIST_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.get('/api/orders', config);

        dispatch({

            type: ORDER_LIST_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {

        dispatch({

            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
        
    }
}