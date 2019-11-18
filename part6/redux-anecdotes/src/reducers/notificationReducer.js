const notificationReducer = (state = null, action) => { 
  switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data
      default:
        return state
    }
  }
  
  export const setNotification = (content, duration) => {
    return dispatch=>{
      dispatch({
        type: 'SET_NOTIFICATION',
        data: content
      })
        setTimeout(() => {
          dispatch({
            type: 'SET_NOTIFICATION',
            data: null
          })
        }, duration * 1000)
   }
  }
  
  export default notificationReducer