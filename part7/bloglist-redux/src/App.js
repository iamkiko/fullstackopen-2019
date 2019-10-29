import React, { useState, useEffect } from "react"
import NewBlog from "./components/NewBlog"
import blogService from "./services/blogs"
import loginService from "./services/login"
// import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import BlogList from "./components/BlogList"
import Togglable from "./components/Togglable"
import { useField } from "./hooks"

import { connect } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs, likeBlog,
  deleteBlog, createBlog } from "./reducers/blogReducer"

const App = (props) => {

  //React internal state
  const username = useField("text")
  const password = useField("password")

  const [user, setUser] = useState(null)
  // const [blogs, setBlogs] = useState([])

  const fetchBlogs = props.initializeBlogs
  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  //action
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  console.log("user: ", user)
  //action
  const notify = (message, type = "success") => {
    props.setNotification({ message, type })
    setTimeout(() => props.setNotification({ message: null, type: null  }), 10000)
  }

  //login component
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notify(`Welcome back ${user.name}`)
    } catch (exception) {
      notify("Wrong username or password", "error")
    }
  }

  //logout component
  const handleLogout = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem("loggedBlogAppUser")
  }


  //to go into Login.js
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            Username
            <input {...username}/>
          </div>
          <div>
            Password
            <input {...password} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

  //to be moved to Blog.js
  const newBlogRef = React.createRef()

  // const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>Blogs</h2>

      <Notification  />

      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>Logout</button>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog
          createBlog={createBlog}
          title={props.title}
          author={props.author}
          url={props.url} />
      </Togglable>
      <BlogList
        blogs={props.blogs}
        loggedInUser={user.username}
        like={props.like}
        remove={props.remove}
      />
      {/* <Blog/> */}
      {/* {displayBlogs()} */}


    </div>
  )}



// const mapStateToProps = state => {
//   console.log("mapStateToProps's State in App.js: ", state)
//   return {
//     blogs: state.blogs
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    initializeBlogs: () => dispatch(initializeBlogs()),
    setNotification: (message, type) => {
      dispatch(setNotification(message, type))
    },
  }
}

export default connect(null, mapDispatchToProps)(App)