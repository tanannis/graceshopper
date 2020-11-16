import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allProducts from './allProducts'
import {singleProduct} from './singleProduct'
import {cartReducer} from './cart'
import allUsers from './allUsers'
import history from './history'

const reducer = combineReducers({
  user,
  singleProduct,
  products: allProducts,
  cart: cartReducer,
  users: allUsers,
  history: history
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store

export * from './user'
export * from './allProducts'
export * from './history'
