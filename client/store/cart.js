import axios from 'axios'

const GET_CART = 'GET_CART'
// const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//action creators
export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

// export const updateProduct = product => {
//   return {
//     type: UPDATE_PRODUCT,
//     product
//   }
// }

// export const deleteSingleProduct = id => {
//   return {
//     type: DELETE_PRODUCT,
//     id
//   }
// }

//thunks
export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('api/cart')
      dispatch(getCart(data))
      console.log('DATA!!', data)
    } catch (error) {
      console.error(error)
    }
  }
}

// export const fetchUpdatedProduct = (product) => {
//   return async (dispatch) => {
//     try {
//       const {data} = await axios.put(`/api/products/${product.id}`, product)
//       dispatch(updateProduct(data))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

// export const deleteProduct = (id) => {
//   return async () => {
//     try {
//       await axios.delete(`/api/products/${id}`)
//       // dispatch(deleteSingleProduct(id))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

// export const addProduct = (product) => {
//   // if (!campus.imageUrl) {
//   //   campus.imageUrl =
//   //     "https://media.istockphoto.com/vectors/vector-school-building-vector-id186655818?k=6&m=186655818&s=612x612&w=0&h=4LAjSdZViLIyvYNILscpMjbkd2e6_2mPa3yf-cStV3Q=";
//   // }
//   return async () => {
//     try {
//       await axios.post('/api/products', product)
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

//initial state
const initialState = []

//reducer
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    // case UPDATE_PRODUCT:
    //   return action.product
    default:
      return state
  }
}
