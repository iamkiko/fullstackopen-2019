import React, { useEffect } from "react"
import NewBlog from "./components/NewBlog"
// import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import BlogList from "./components/BlogList"
import Togglable from "./components/Togglable"
import { useField } from "./hooks"

import { connect } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { initializeBlogs, createBlog } from "./reducers/blogReducer"
import { setUser, setToken, logout } from "./reducers/userReducer"

const App = props => {
  // const [user, setUser] = useState(null)
  //React internal state
  const [username, usernameReset] = useField("text")
  const [password, passwordReset] = useField("password")

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
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      props.setToken(user.token)
    }
  }, [])

  //action
  const notify = (message, type = "success") => {
    props.setNotification({ message, type })
    setTimeout(() => props.setNotification({ message: null, type: null }), 5000)
  }

  //login component
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      props.setToken(user.token)
      props.setUser(user)
      notify(`Welcome back ${user.name}`)
    } catch (exception) {
      notify("Wrong username or password", "error")
    }
  }

  //logout component
  const handleLogout = () => {
    props.logout()
    // blogService.destroyToken()
    window.localStorage.removeItem("loggedBlogAppUser")
  }

  //to go into Login.js
  if (props.username === "") {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            Username
            <input {...username} />
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

  const addBlog = async event => {
    event.preventDefault()
    newBlogRef.current.toggleVisibility()
    const newBlogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      id: props.id
    }
    console.log("newBlogObject: ", newBlogObject)
    try {
      props.createBlog(newBlogObject)
      notify(
        `Blog ${newBlogObject.title} by ${newBlogObject.author} successfully added!`
      )
      titleReset()
      authorReset()
      urlReset()
    } catch (error) {
      notify(`Unable to add blog. Error: ${error}`)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>{props.name} is logged in</p>
      <button onClick={handleLogout}>Logout</button>

      <Togglable buttonLabel="create new" ref={newBlogRef}>
        <NewBlog addBlog={addBlog} title={title} author={author} url={url} />
      </Togglable>
      <BlogList
        blogs={props.blogs}
        loggedInUser={props.username}
        like={props.like}
        remove={props.remove}
      />
      {/* <Blog/> */}
      {/* {displayBlogs()} */}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    username: state.user.username,
    name: state.user.name,
    id: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeBlogs: () => dispatch(initializeBlogs()),
    createBlog: blog => dispatch(createBlog(blog)),
    setUser: user => dispatch(setUser(user)),
    setToken: token => dispatch(setToken(token)),
    logout: () => dispatch(logout()),
    setNotification: (message, type) => {
      dispatch(setNotification(message, type))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
