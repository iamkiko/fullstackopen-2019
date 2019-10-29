import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, remove, creator }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log("blog in blog.js: ", blog)
  const details = () => (
    <div className='details'>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes
        <button onClick={() => like(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {creator &&(<button onClick={() => remove(blog)}>remove </button>)}
    </div>
  )

  // const addedBy = () => {
  //   if(blog.user && blog.user.name) {
  //     return (
  //       <p>added by {blog.user.name}</p>
  //     )
  //   }
  // }

  // const userCanDelete = () => {
  //   if(blog.user && creator === blog.user.id) {
  //     return (
  //       <div>
  //         <button onClick{remove}>Delete</button>
  //       </div>
  //     )
  //   }
  // }
  return (
    <div style={blogStyle}>
      <div onClick={() => setExpanded(!expanded)} className='name'>
        {blog.title} {blog.author}
      </div>
      {expanded && details()}
    </div>
  )}

  const mapStateToProps = state => {
    console.log("mapStateToProps's State in App.js: ", state)
    return {
      blogs: state.blogs
    }
  }

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   like: PropTypes.func.isRequired,
//   remove: PropTypes.func.isRequired,
//   creator: PropTypes.bool.isRequired
// }

export default Blog