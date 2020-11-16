/* eslint-disable complexity */
import axios from 'axios'

const GET_CART = 'GET_CART'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const ADD_NEW_ITEM_TO_CART = 'ADD_NEW_ITEM_TO_CART'
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'

//action creators
export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const updateItemQuantity = item => {
  return {
    type: UPDATE_ITEM_QUANTITY,
    item
  }
}

export const addNewItemToCart = itemToAdd => {
  return {
    type: ADD_NEW_ITEM_TO_CART,
    itemToAdd
  }
}

export const deleteItemFromCart = id => {
  return {
    type: DELETE_ITEM_FROM_CART,
    id
  }
}

export const checkoutCart = cart => {
  return {
    type: CHECKOUT_CART,
    cart
  }
}

//thunks
export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchUpdatedItemQuantity = updatedOrderItem => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/cart/item/${updatedOrderItem.productId}`,
        updatedOrderItem
      )
      dispatch(updateItemQuantity(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchDeleteItemFromCart = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cart/item/${id}`)
      dispatch(deleteItemFromCart(id))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchAddNewItemToCart = itemToAdd => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart', itemToAdd)
      dispatch(addNewItemToCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchCheckoutCart = cartToCheckout => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/checkout`, cartToCheckout)
      console.log('CART', cartToCheckout)
      const message = {
        email: '', // NEED TO ADD EMAIL TO ORDER MODEL
        subject: 'Grace Bakes Order Confirmation',
        message: 'Congrats on purchasing from Grace Bakes!'
      }
      await axios.post('/api/cart/checkout', message)
      dispatch(checkoutCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//initial state
const initialState = {}

//reducer
export const cartReducer = (cart = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_ITEM_QUANTITY: {
      const updatedCart = {...cart}
      for (let i = 0; i < updatedCart.products.length; i++) {
        let current = updatedCart.products[i]
        if (current.id === action.item.productId) {
          current.orderItem = action.item
        }
      }
      return updatedCart
    }
    case ADD_NEW_ITEM_TO_CART: {
      let newCart = {...cart}
      newCart.products.push({
        id: action.itemToAdd.productId,
        orderItem: action.itemToAdd
      })
      return newCart
    }
    case DELETE_ITEM_FROM_CART: {
      let updatedCart = {...cart}
      for (let i = 0; i < updatedCart.products.length; i++) {
        let current = updatedCart.products[i]
        if (current.id === action.id) {
          updatedCart.products.splice(i, 1)
        }
      }
      return updatedCart
    }
    case CHECKOUT_CART: {
      const newCart = {}
      return newCart
    }
    default:
      return cart
  }
}
