import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const CHANGE_USER_TYPE = 'CHANGE_USER_TYPE'

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
const changeUserType = user => ({type: CHANGE_USER_TYPE, user})

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
export const fetchUpdatedUser = user => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/changeUserType/${user.id}`)
      dispatch(changeUserType(data))
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
    case CHANGE_USER_TYPE: {
      const updatedState = [...state]
      for (let i = 0; i < updatedState.length; i++) {
        let current = updatedState[i]
        if (current.id === action.user.id) {
          updatedState[i] = action.user
        }
      }
      return updatedState
    }
    default:
      return state
  }
}
