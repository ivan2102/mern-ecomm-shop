import { 
    PRODUCT_REQUEST,
     PRODUCT_SUCCESS,
      PRODUCT_FAIL,
       SINGLE_PRODUCT_FAIL,
        SINGLE_PRODUCT_REQUEST, 
        SINGLE_PRODUCT_SUCCESS,
        PRODUCT_DELETE_FAIL,
        PRODUCT_DELETE_REQUEST,
        PRODUCT_DELETE_SUCCESS,
        PRODUCT_CREATE_FAIL,
        PRODUCT_CREATE_SUCCESS,
        PRODUCT_CREATE_REQUEST,
        PRODUCT_UPDATE_FAIL,
        PRODUCT_UPDATE_REQUEST,
        PRODUCT_UPDATE_SUCCESS,
        PRODUCT_REVIEWS_REQUEST,
        PRODUCT_REVIEWS_FAIL,
        PRODUCT_REVIEWS_SUCCESS,
        TOP_PRODUCT_FAIL,
        TOP_PRODUCT_REQUEST,
        TOP_PRODUCT_SUCCESS
    } from "./types";
import axios from "axios";

export const getProducts = (keyword = '', pageNumber = '') => async dispatch => {

     try {

        dispatch({

            type: PRODUCT_REQUEST
        })

        const res = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);

        dispatch({

            type: PRODUCT_SUCCESS,
            payload: res.data
        })
         
     } catch (error) {

        dispatch({

            type: PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
         
     }
}


export const getSingleProduct = (id) => async dispatch => {

    try {

        dispatch({

            type: SINGLE_PRODUCT_REQUEST
        })


        const res = await axios.get(`/api/products/${id}`);

        dispatch({

            type: SINGLE_PRODUCT_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {

        dispatch({

            type: SINGLE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}

// Create Product
export const createProduct = () => async (dispatch, getState) => {

    try {

        dispatch({

            type: PRODUCT_CREATE_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const res = await axios.post('/api/products', {}, config);

        dispatch({

            type: PRODUCT_CREATE_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {

        dispatch({

            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}

//Product Reviews
export const productReviewsAction = (id, review) => async (dispatch, getState) => {

    try {

        dispatch({

            type: PRODUCT_REVIEWS_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/products/${id}/reviews`, review, config);

        dispatch({

            type: PRODUCT_REVIEWS_SUCCESS,
         
        })
        
    } catch (error) {

        dispatch({

            type: PRODUCT_REVIEWS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}


// Update Product
export const updateProductAction = (product) => async (dispatch, getState) => {

    try {

        dispatch({

            type: PRODUCT_UPDATE_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.put(`/api/products/${product._id}`, product, config);

        dispatch({

            type: PRODUCT_UPDATE_SUCCESS,
            payload: res.data
        })

        dispatch({

            type: SINGLE_PRODUCT_SUCCESS,
            payload: res.data
        })

        
    } catch (error) {

        dispatch({

            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}


// Top Product
export const topProductAction = () => async dispatch => {

    try {

        dispatch({

            type: TOP_PRODUCT_REQUEST
        })

        const res = await axios.get('/api/products/top');

        dispatch({

            type: TOP_PRODUCT_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {

        dispatch({

            type: TOP_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}


// Delete products
export const deleteProductAction = (id) => async (dispatch, getState) => {

    try {

        dispatch({

            type: PRODUCT_DELETE_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

         await axios.delete(`/api/products/${id}`, config);

        dispatch({

            type: PRODUCT_DELETE_SUCCESS
           
        })
        
    } catch (error) {

        dispatch({

            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}