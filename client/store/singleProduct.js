import axios from 'axios'

const PICK_PRODUCT = 'PICK_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//action creators
export const pickProduct = product => {
  return {
    type: PICK_PRODUCT,
    product
  }
}

export const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

//thunks
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(pickProduct(data))
      // console.log('DATA!!', data)
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchUpdatedProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${product.id}`, product)
      dispatch(updateProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//initial state
const initialState = {}

//reducer
export const singleProduct = (state = initialState, action) => {
  switch (action.type) {
    case PICK_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return action.product
    default:
      return state
  }
}
