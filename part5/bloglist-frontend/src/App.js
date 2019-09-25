import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import SuccessNotification from "./components/SuccessNotification"
import ErrorNotification from "./components/ErrorNotification"
import LoginForm from "./components/LoginForm"
import CreateBlog from "./components/CreateBlog"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"
import loginService from "./services/login"
import { useField } from "./hooks"

import "./index.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const username = useField("username")
  const password = useField("password")
  const title = useField("text")
  const author = useField("text")
  const url = useField("text")

  //init blogs on page with useEffect - update to async/await?
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  //   add useEffect for local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //add handleLogin to send form
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        "loggedBlogUser", JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      successContent(`Welcome back ${user.name}!`)
    } catch(exception) {
      errorContent("Wrong username or password")
      //   setTimeout(() => {
      //     setErrorMessage(null)
      //   }, 5000)
    }
  }

  //logout functionality
  const handleLogout = async (event) => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }


  //like button functionality
  const addLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog: returnedBlog))
    }
    catch(error) {
      errorContent(error)
    }  
  }

  //updating the bloglist to render once blog has been deleted
  const bloglistAfterDelete = (id) => {
    const latestBlogs = blogs.filter(b => b.id !== id)
    setBlogs(latestBlogs)
  }

  const showBlogs = () => blogs.sort((a, b) => b.likes - a.likes).map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      user={user}
      addLike={() => addLike(blog.id)}
      bloglistAfterDelete={bloglistAfterDelete}
    />
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="Add a blog" ref={blogFormRef}>
      <CreateBlog
        addBlog={addBlog}
        title={title}
        author={author}
        url={url}
      />
    </Togglable>
  )

  const addBlog = async (event) => { //need to update to async/await
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value
      }

      const addedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(addedBlog))
      title.reset()
      author.reset()
      url.reset()
      successContent(`a new blog added: ${title.value} by ${author.value}`)
    } catch (error) {
      errorContent(error)
    }
  }


  const errorContent = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const successContent = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage}/>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
	    	/>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>Blogs</h2>
        <SuccessNotification message={successMessage}/>
        <p>{user.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </p>
        {blogForm()}
      </div>
      <div>
        {showBlogs()}
      </div>
    </div>
  )
}




export default App