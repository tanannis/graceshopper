import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})
// const removeUser = () => ({type: REMOVE_USER})

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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
