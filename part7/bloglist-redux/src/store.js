import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import logger from "redux-logger"
import thunk from "redux-thunk"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
    // other store enhancers if any
  )
)

export default store
