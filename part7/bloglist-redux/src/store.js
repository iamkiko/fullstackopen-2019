import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import notificationReducer from "./reducers/notificationReducer"

const reducer = combineReducers({
  // anecdotes: anecdoteReducer,
  notification: notificationReducer
  // filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
))
   

  export default store