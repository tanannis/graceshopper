import axios from 'axios'

const PICK_PRODUCT = 'PICK_PRODUCT'

//action creators
export const pickProduct = product => {
  return {
    type: PICK_PRODUCT,
    product
  }
}

//thunks
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(pickProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//initial state
const initialState = {}

//reducer
export const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case PICK_PRODUCT:
      return action.product
    default:
      return state
  }
}
