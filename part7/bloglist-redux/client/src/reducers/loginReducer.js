// import userService from "../services/users"
import blogService from "../services/blogs"

const SET_USER = "SET_USER"
const SET_TOKEN = "SET_TOKEN"
const LOGOUT = "LOGOUT"

const initialState = {
  username: "",
  name: "",
  id: ""
}

export const setUser = user => {
  return {
    type: SET_USER,
    data: user
  }
}

export const setToken = token => {
  return async dispatch => {
    await blogService.setToken(token)
    dispatch({
      type: SET_TOKEN
    })
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        username: action.data.username,
        name: action.data.name,
        id: action.data.id,
        token: action.data.token
      }
    case SET_TOKEN:
      return state
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default loginReducer
