import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState('') 
  const [blogAuthor, setBlogAuthor] = useState('') 
  const [blogUrl, setBlogUrl] = useState('') 
  
  //init blogs on page with useEffect - update to async/await?
  useEffect(() => {
      blogService
        .getAll()
        .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

//   add useEffect for local storage
  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
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
              username, password,
          })

          window.localStorage.setItem(
              'loggedBlogUser', JSON.stringify(user)
          )

          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch(exception) {
          errorContent('Wrong username or password')
        //   setTimeout(() => {
        //     setErrorMessage(null)
        //   }, 5000)
      }
  }

  const handleLogout = async (event) => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  //add sort method to organize by likes

  const addLike = (id) => {
    const blog = blogs.find(b => b.id === id)

    const updatedBlog = {...blog, likes: blog.likes + 1}

    blogService
    .update(id, updatedBlog)
    .then(returnedBlog => {
       setBlogs(blogs.map(blog => blog.id !== id ? blog: returnedBlog))
    }).catch(error => {
       console.log(error)
    })
 }

  const showBlogs = () => blogs.map(blog =>
    <Blog
        key={blog.id}
        blog={blog}
        addLike={() => addLike(blog.id)}
    />
    )
    
  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="Add a blog" ref={blogFormRef}>
      <CreateBlog 
        addBlog={addBlog}
        blogTitle={blogTitle}
        setBlogTitle={setBlogTitle}
        blogAuthor={blogAuthor}
        setBlogAuthor={setBlogAuthor}
        blogUrl={blogUrl}
        setBlogUrl={setBlogUrl}
      />
    </Togglable>
  )

  const addBlog = (event) => { //need to update to async/await
      event.preventDefault()
      blogFormRef.current.toggleVisibility()
      const blogObject = {
          title: blogTitle,
          author: blogAuthor,
          url: blogUrl
      }

      blogService
      .create(blogObject)
      .then(addedBlog => {
          setBlogs(blogs.concat(addedBlog))
          setNewBlog('')
          setBlogTitle('')
          setBlogAuthor('')
          setBlogUrl('')
      })
      successContent(`a new blog ${blogTitle} by ${blogAuthor} added`)
  }


  const errorContent = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const successContent = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
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
          setUsername={setUsername}
          setPassword={setPassword}
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




export default App;
