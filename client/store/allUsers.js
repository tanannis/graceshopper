import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')

      dispatch(getAllUsers(data))
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
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
