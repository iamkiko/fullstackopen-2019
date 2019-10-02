// const initialState = action.data.content

const notificationReducer = (state = "TEST", action) => {
  // console.log("NOTIFICATION: ", action.data.content)
    switch (action.type) {
      case 'SHOW_NOTIFICATION':
        return action.data.content
      default:
        return state
    }
  }
  
  //action creator function
  export const setNotification = (notification) => {
     return {
        type: 'SHOW_NOTIFICATION',
        notification
      }
  
  }
  
  export default notificationReducer