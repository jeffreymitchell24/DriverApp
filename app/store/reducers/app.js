import { ADD_APP, DELETE_APP } from '../constants'

const initialState = { app: { first_start: false } }

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_APP:
      return {
        ...state,
        app: action.app
      }
    case DELETE_APP:
      return {
        ...state,
        app: action.app
      }
    default:
      return state
  }
}
