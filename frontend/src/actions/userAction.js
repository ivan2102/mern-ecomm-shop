import { 
    USER_LOGIN_REQUEST,
     USER_LOGIN_SUCCESS, 
     USER_LOGIN_FAIL, 
     USER_LOGOUT, 
     USER_REGISTER_FAIL,
      USER_REGISTER_REQUEST,
       USER_REGISTER_SUCCESS,
       USER_DETAILS_FAIL,
       USER_DETAILS_REQUEST,
       USER_DETAILS_SUCCESS,
       USER_DETAILS_RESET,
       USER_UPDATE_PROFILE_REQUEST,
       USER_UPDATE_PROFILE_FAIL,
       USER_UPDATE_PROFILE_SUCCESS,
       USER_LIST_FAIL,
       USER_LIST_REQUEST,
       USER_LIST_SUCCESS,
       USER_LIST_RESET,
       USER_DELETE_REQUEST,
       USER_DELETE_SUCCESS,
       USER_DELETE_FAIL,
       UPDATE_USER_FAIL,
       UPDATE_USER_REQUEST,
       UPDATE_USER_SUCCESS
       
     } from "./types";

import { MY_ORDERS_PROFILE_PAGE_RESET } from "./types";

import axios from 'axios';


export const userLogin = (email, password) => async dispatch => {

    try {

    dispatch({

        type: USER_LOGIN_REQUEST
    })

    const config = {

        headers: {

            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({

        email,
        password
    })

    const res = await axios.post('/api/users/login', body, config);

    dispatch({

        type: USER_LOGIN_SUCCESS,
        payload: res.data
    })


    localStorage.setItem('userInfo', JSON.stringify(res.data))

}catch(error) {

    dispatch({

        type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
}


}


export const userRegister = (name, email, password) => async dispatch => {

    try {

        dispatch({

            type: USER_REGISTER_REQUEST
        })

       const config = {

        headers: {

            'Content-Type': 'application/json'
        }
       }

       const body = JSON.stringify({

        name,
        email,
        password
       })

        const res = await axios.post('/api/users', body, config);

        dispatch({

            type: USER_REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch({

            type: USER_LOGIN_SUCCESS,
            payload: res.data
        })

        localStorage.setItem('userInfo', JSON.stringify(res.data));
        
    } catch (error) {

        dispatch({

            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {

     try {

        dispatch({

            type: USER_DETAILS_REQUEST
        })

        const { login: { userInfo}  } = getState()

        const config = {

            headers: {

                 'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

       

        const res = await axios.get(`/api/users/${id}`, config);

        dispatch({

            type: USER_DETAILS_SUCCESS,
            payload: res.data
        })
         
     } catch (error) {

        dispatch({

            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
         
     }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {

    try {

        dispatch({

            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const res = await axios.put('/api/users/profile', user, config);

        dispatch({

            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: res.data
        })

        dispatch({

            type: USER_LOGIN_SUCCESS,
            payload: res.data
        })

        localStorage.setItem('userInfo', JSON.stringify(res.data))
        
    } catch (error) {
        
        dispatch({

            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// All Users Admin
export const listUsers = () => async (dispatch, getState) => {

    try {

        dispatch({

            type: USER_LIST_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const res = await axios.get('/api/users', config);

        dispatch({

            type: USER_LIST_SUCCESS,
            payload: res.data
        })
        
    } catch (error) {

        dispatch({

            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}


export const updateUsers = ( user) => async (dispatch, getState) => {

    try {

        dispatch({

            type: UPDATE_USER_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                'Content-Type': 'application/json',
                Authorization: `Bearer ${ userInfo.token }`
            }
        }

        const res = await axios.put(`/api/users/${user._id}`,user, config);

        dispatch({

            type: UPDATE_USER_SUCCESS
            
        })

        dispatch({

            type: USER_DETAILS_SUCCESS,
             payload: res.data
        })
        
    } catch (error) {

        dispatch({

            type: UPDATE_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}


export const deleteUserAction = (id) => async (dispatch, getState) => {

    try {

        dispatch({

            type: USER_DELETE_REQUEST
        })

        const {login: { userInfo }} = getState()

        const config = {

            headers: {

                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

         await axios.delete(`/api/users/${id}`, config);

        dispatch({

            type: USER_DELETE_SUCCESS,
            
        })
        
    } catch (error) {

      dispatch({

        type: USER_DELETE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      }) 
        
    }
}


export const logout = () => dispatch => {

    localStorage.removeItem('userInfo');

    dispatch({ type: USER_LOGOUT })
    dispatch({type: USER_DETAILS_RESET })
    dispatch({ type: MY_ORDERS_PROFILE_PAGE_RESET })
    dispatch({ type: USER_LIST_RESET })
}