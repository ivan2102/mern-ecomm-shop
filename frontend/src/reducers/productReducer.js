

const initialState = {

    products: [],
    product: { reviews: [] }
    
}

export const productReducer = (state = initialState, action) => {

   switch (action.type) {

      case 'PRODUCT_REQUEST':

      return {
        products: [],
        loading: true
      }

      case 'PRODUCT_SUCCESS':

      return {

        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
        loading: false
      }

      case 'PRODUCT_FAIL':

      return {
        error: action.payload,
        loading: false
      }

      default: 

      return state;
   }
}


export const productDetailsReducer = (state = {product: {reviews: [] } }, action) => {

    switch (action.type) {

        case 'SINGLE_PRODUCT_REQUEST':

            return {
      
              ...state,
              loading: false
            }
      
            case 'SINGLE_PRODUCT_SUCCESS':
      
            return {
      
              product: action.payload,
              loading: false
            }
      
            case 'SINGLE_PRODUCT_FAIL':
      
            return {
      
              error: action.payload,
              loading: false
            }

            default:

            return state;
    }
}


// Product Create 
export const productCreateReducer = (state = {product: {}}, action) => {

  switch (action.type) {

    case 'PRODUCT_CREATE_REQUEST':

    return {

      loading: true
    }

    case 'PRODUCT_CREATE_SUCCESS':

    return {

      success: true,
      product: action.payload,
      loading: false
    }

    case 'PRODUCT_CREATE_FAIL':

    return {

      error: action.payload,
      loading: false
    }

    case 'PRODUCT_CREATE_RESET':

    return {}

    default:

    return state;
  }
}


// Update Product
export const updateProductReducer = (state = { product: {} }, action) => {

  switch (action.type) {

    case 'PRODUCT_UPDATE_REQUEST':

    return {

      loading: true
    }

    case 'PRODUCT_UPDATE_SUCCESS':

    return {

      product: action.payload,
      success: true,
      loading: false
    }

    case 'PRODUCT_UPDATE_FAIL':

    return {

      error: action.payload,
      loading: false
    }

    case 'PRODUCT_UPDATE_RESET':

    return {

      product: {}
    }

    default:

    return state;
  }
}


export const productReviewsReducer = (state = {}, action) => {

  switch(action.type) {

    case 'PRODUCT_REVIEWS_REQUEST':

    return {

      loading: true
    }

    case 'PRODUCT_REVIEWS_SUCCESS':

    return {

      success: true,
      loading: false
    }

    case 'PRODUCT_REVIEWS_FAIL':

    return {

      error: action.payload,
      loading: false
    }

    case 'PRODUCT_REVIEWS_RESET':

    return {}

    default:

    return state;
  }
}


//Top Product
export const productTopRatedReducer = (state = initialState, action) => {

  switch(action.type) {

    case 'TOP_PRODUCT_REQUEST':

    return {

      loading: true,
      products: []
    }

    case 'TOP_PRODUCT_SUCCESS':

    return {

      products: action.payload,
      loading: false
    }

    case 'TOP_PRODUCT_FAIL':

    return {

      error: action.payload,
      loading: false
    }

    default:

    return state;
  }
}


// Delete Product
export const productDeleteReducer = (state = {}, action) => {

  switch (action.type) {

      case 'PRODUCT_DELETE_REQUEST':

      return {

        loading: true
      }

      case 'PRODUCT_DELETE_SUCCESS':

      return {

        success: true,
        loading: false
      }

      case 'PRODUCT_DELETE_FAIL':

      return {

        error: action.payload,
        loading: false
      }

      default:

      return state;
  }
}


