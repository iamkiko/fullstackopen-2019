import React, { useState, useEffect } from "react"
import NewBlog from "./components/NewBlog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import BlogList from "./components/BlogList"
import Togglable from "./components/Togglable"
import { useField } from "./hooks"

import { connect } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs, likeBlog, createBlog } from "./reducers/blogReducer"

const App = (props) => {
  const [user, setUser] = useState(null)
  //React internal state
  const  [username, resetUsername] = useField("text")
  const  [password, resetPassword] = useField("password")

  const [title, titleReset] = useField("text")
  const [author, authorReset] = useField("text")
  const [url, urlReset] = useField("text")
  // const [blogs, setBlogs] = useState([])

  const fetchBlogs = props.initializeBlogs
  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  //action for logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    // console.log("loggedUserJSON :", loggedUserJSON )
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // console.log("user in UseEffect: ", user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // console.log("user: ", user)

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
      // console.log(user)
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

  const addBlog = async event => {
    event.preventDefault()
    newBlogRef.current.toggleVisibility()
    const newBlogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    console.log("newBlogObject: ", newBlogObject)
    try {
      props.createBlog(newBlogObject)
      props.setNotification({
        message: `Blog ${newBlogObject.title} by ${newBlogObject.author} successfully added!`,
        type: "blogMessage",
        timeout: 5000
      })
      titleReset()
      authorReset()
      urlReset()
    } catch (error) {
      props.setNotification({
        message: `Unable to add blog. Error: ${error}`,
        type: "error",
        timeout: 5000
      })
    }
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification  />

      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>Logout</button>

      <Togglable buttonLabel='create new' ref={newBlogRef}>
        <NewBlog
          addBlog={addBlog}
          title={title}
          author={author}
          url={url} />
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



const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeBlogs: () => dispatch(initializeBlogs()),
    // likeBlog: (blog) => dispatch(likeBlog(blog)),
    createBlog: (blog) => dispatch(createBlog(blog)),
    // deleteBlog: blogId => dispatch(deleteBlog(blogId)),
    setNotification: (message, type) => {
      dispatch(setNotification(message, type))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)