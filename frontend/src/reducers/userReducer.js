
const initialState = {

    user: {},
    users: []
}

export const userLoginReducer = (state = {}, action) => {


    switch (action.type) {

        case 'USER_LOGIN_REQUEST':

        return {

            loading: true
        }


        case 'USER_LOGIN_SUCCESS':

        return {

            userInfo: action.payload,
            loading: false
        }

        case 'USER_LOGIN_FAIL':

        return {

            error: action.payload,
            loading: false
        }

        case 'USER_LOGOUT':

        return {}

        default: 

        return state;
    }
}


export const userRegisterReducer = (state = {}, action) => {

    switch (action.type) {

        case 'USER_REGISTER_REQUEST':

        return {

            loading: true
        }

        case 'USER_REGISTER_SUCCESS':

        return {

            userInfo: action.payload,
            loading: false
        }

        case 'USER_REGISTER_FAIL':

        return {

            error: action.payload,
            loading: false
        }

        default:

        return state;
    }
}


export const userDetailsReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'USER_DETAILS_REQUEST':

        return {
            ...state,
            loading: true
        }

        case 'USER_DETAILS_SUCCESS': 

        return {

            user: action.payload,
            loadind: false
        }

        case 'USER_DETAILS_FAIL':

        return {

            error: action.payload,
            loading: false
        }

        case 'USER_DETAILS_RESET':

        return {

            user: {}
        }

        default:

        return state;
    }
}


export const userUpdateProfileReducer = (state = {}, action) => {

    switch (action.type) {

        case 'USER_UPDATE_PROFILE_REQUEST':

        return {

            loading: true
        }

        case 'USER_UPDATE_PROFILE_SUCCESS':

        return {

            userInfo: action.payload,
            loading: false,
            success: true
        }

        case 'USER_UPDATE_PROFILE_FAIL':

        return {

            error: action.payload,
            loading: false
        }

        case 'USER_UPDATE_PROFILE_RESET':

        return {}

        default: 

        return state;
    }
}

export const userListReducer = (state = initialState, action) => {

   switch (action.type) {

      case 'USER_LIST_REQUEST':

      return {

        loading: true
      }

      case 'USER_LIST_SUCCESS':

      return {

        users: action.payload,
        loading: false
      }

      case 'USER_LIST_FAIL':

      return {

        error: action.payload,
        loading: false
      }

      case 'USER_LIST_RESET':

      return {

        users: []
      }

      default:

      return state;
   }
}



export const updateUserReducer = (state = {}, action) => {

    switch (action.type) {

        case 'UPDATE_USER_REQUEST':

        return {
            
            loading: true
        }

        case 'UPDATE_USER_SUCCESS':

        return {

            success: true,
            loading: false
        }

        case 'UPDATE_USER_FAIL':

        return {

            error: action.payload,
            loading: false
        }

        case 'UPDATE_USER_RESET':

        return {

            user: {}
        }

        default:

        return state;
    }
}

export const deleteUserReducer = (state = {}, action) => {

    switch (action.type) {

        case 'USER_DELETE_REQUEST':

        return {

            loading: true
        }

        case 'USER_DELETE_SUCCESS':

        return {

            success: true,
            loading: false
        }

        case 'USER_DELETE_FAIL':

        return {

            error: action.payload,
            loading: false
        }

        default:

        return state;
    }
}