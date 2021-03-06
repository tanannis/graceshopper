import axios from 'axios'

const PICK_PRODUCT = 'PICK_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
// const DELETE_PRODUCT = "DELETE_PRODUCT"

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

// export const deleteSingleProduct = id => {
//   return {
//     type: DELETE_PRODUCT,
//     id
//   }
// }

//thunks
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(pickProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchUpdatedProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${product.id}`, product)
      dispatch(updateProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteProduct = id => {
  return async () => {
    try {
      await axios.delete(`/api/products/${id}`)
      // dispatch(deleteSingleProduct(id))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addProduct = product => {
  if (!product.imageUrl) {
    product.imageUrl =
      'https://snellservices.com/wp-content/uploads/2019/07/image-coming-soon.jpg'
  }
  return async () => {
    try {
      await axios.post('/api/products', product)
    } catch (error) {
      console.error(error)
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
