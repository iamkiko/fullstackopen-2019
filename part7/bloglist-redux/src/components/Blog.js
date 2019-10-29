import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, remove, loggedInUser }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log("logged in user's username: ", blog.user.username)
  console.log("blog.user in blog.js: ", blog.user)
  console.log("blog in blog.js: ", blog)
  const details = () => (
    <div className='details'>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {userCanDelete()}
      {/* {user.username &&(<button onClick={() => remove(blog)}>remove </button>)} */}
    </div>
  )

  const userCanDelete = () => {
    if(blog.user && loggedInUser === blog.user.username) {
      return (
        <div>
          <button onClick={() => remove(blog)}>Delete</button>
        </div>
      )
    }
  }
  return (
    <div style={blogStyle}>
      <div onClick={() => setExpanded(!expanded)} className='name'>
        {blog.title} {blog.author}
      </div>
      {expanded && details()}
    </div>
  )}

  // const mapStateToProps = state => {
  //   console.log("mapStateToProps's State in App.js: ", state)
  //   return {
  //     blogs: state.blogs
  //   }
  // }

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   like: PropTypes.func.isRequired,
//   remove: PropTypes.func.isRequired,
//   loggedInUser: PropTypes.bool.isRequired
// }

export default Blog