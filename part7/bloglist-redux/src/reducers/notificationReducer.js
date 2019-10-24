const SET_NOTIFICATION = "SET_NOTIFICATION"
const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION"

export const setNotification = ({ message, type }) => {
  return {
    type: SET_NOTIFICATION,
    data: { message, type }
  }
}

export const clearNotification = () => {
  return {
    type: CLEAR_NOTIFICATION
  }
}

const notificationReducer = (state = [{ message: null, type: null }], action) => {
  switch(action.type) {
  case SET_NOTIFICATION:
    console.log(action.data)
    return action.data
  case CLEAR_NOTIFICATION:
    return {
      message: null,
      type: null
    }
  default:
    return state
  }
}


export default notificationReducer