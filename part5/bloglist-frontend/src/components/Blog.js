import React, { useState }  from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, user, bloglistAfterDelete }) => {
  const [completeBlog, setCompleteBlog] = useState(false)

  const completeBlogInfo = { display: completeBlog ? '' : 'none' }

  const toggleVisibility = () => {
    setCompleteBlog(!completeBlog)
    }

  const deleteBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
        .then(() => {
          bloglistAfterDelete(blog.id)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButtonVisible = blog.user.username === user.username ? true : false

  const showDeleteButton = {
    display: deleteButtonVisible ? "" : "none"
  }
  // if(user.username === blog.user.username) {
    return (
      <div style={blogStyle}>
        <div onClick={() => toggleVisibility()} className="basicInfo">
          {blog.title} {blog.author}
        </div>
        <div style={completeBlogInfo} className="fullInfo">
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes
            <button onClick={addLike}>like</button>
          </p>
          <p>added by {blog.user.username} </p>
          <button style={showDeleteButton} onClick={() => deleteBlog(blog.id)}>delete</button>
        </div>
      </div>
    )
  // } else {
  //   return (
  //     <div style={blogStyle}>
  //       <div onClick={() => toggleVisibility()}>
  //         {blog.title} {blog.author}
  //       </div>
  //       <div style={completeBlogInfo} className="fullInfo">
  //         <p>{blog.url}</p>
  //         <p>
  //           {blog.likes} likes
  //           <button onClick={addLike}>like</button>
  //         </p>
  //         <p>added by {blog.user.username} </p>

  //       </div>
  //     </div>
  //   )
  // }

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  bloglistAfterDelete: PropTypes.func.isRequired
}

export default Blog