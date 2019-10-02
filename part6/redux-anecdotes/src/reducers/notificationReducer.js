const initialState = ""

const notificationReducer = (state = initialState, action) => { 

   console.log('notificationReducer: ', state, action)
  switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data
      default:
        return state
    }
  }
  
  //action creator functions
  export const setNotification = (content) => {
     return {
         type: 'SET_NOTIFICATION',
         data: {
           content
         }
      }
    }
  
  export default notificationReducer