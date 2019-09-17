import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
      blogService
        .getAll()
        .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  //add useeffect for local storage
//   useEffect(() => {
//       const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
//       if (loggedUserJSON){
//           const user = JSON.parse(loggedUserJSON)
//           setUser(user)
//           blogService.setToken(user.token)
//       }
//   }, [])

  //add handleLogin to send form
  const handleLogin = async (event) => {
      event.preventDefault()
      try {
          const user = await loginService.login({
              username, password,
          })

        //   window.localStorage.setItem(
        //       'loggedBlogUser', JSON.stringify(user)
        //   )

        //   blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch(exception) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
      }
  }


  const showBlogs = () => blogs.map(blog =>
    <Blog
        key={blog.id}
        blog={blog}
        //requires author and title?
    />
    )

  //need to add blog form to submit (like noteForm)

//   const handleBlogChange = (event) => {
//       setNewBlog(event.target.value)
//   }

  // addBlog function with schema params and service

if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <LoginForm
		handleLogin={handleLogin}
		username={username}
		password={password}
        setUsername={setUsername}
        setPassword={setPassword}
		/>
        {/* <div>{loginForm()}</div> */}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <p>{user.name} logged in</p>
      {showBlogs()}
    </div>
  )
}




export default App;
