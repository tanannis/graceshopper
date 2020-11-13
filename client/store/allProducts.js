import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const getAllProducts = products => ({type: GET_ALL_PRODUCTS, products})

export const deleteSingleProduct = id => {
  return {
    type: DELETE_PRODUCT,
    id
  }
}

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')

      dispatch(getAllProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteProduct = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${id}`)
      dispatch(deleteSingleProduct(id))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    case DELETE_PRODUCT: {
      let updatedState = [...state]
      console.log(updatedState)
      for (let i = 0; i < updatedState.length; i++) {
        let current = updatedState[i]
        if (current.id === action.id) {
          updatedState.splice(i, 1)
        }
      }
      return updatedState
    }
    default:
      return state
  }
}
