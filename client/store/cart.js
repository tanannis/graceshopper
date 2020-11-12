import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_NEW_ITEM_TO_CART = 'ADD_NEW_ITEM_TO_CART'
//const ADD_EXISTING_ITEM_TO_CART = 'ADD_EXISTING_ITEM_TO_CART'

//action creators
export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const addNewItemToCart = itemToAdd => {
  return {
    type: ADD_NEW_ITEM_TO_CART,
    itemToAdd
  }
}

// export const addExistingItemToCart = itemToAdd => {
//   return {
//     type: ADD_EXISTING_ITEM_TO_CART,
//     itemToAdd
//   }
// }

//thunks
export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(getCart(data))
      console.log('DATA!!', data)
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchAddNewItemToCart = itemToAdd => {
  return async dispatch => {
    try {
      console.log('THUNK ITEM', itemToAdd)
      const {data} = await axios.post('/api/cart', itemToAdd)
      dispatch(addNewItemToCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

//initial state
const initialState = []

//reducer
export const cartReducer = (cart = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_NEW_ITEM_TO_CART: {
      /// NEED TO FIX THIS!!!
      return [...cart, action.itemToAdd]
    }
    default:
      return cart
  }
}
