import React, { useState } from "react"
// import PropTypes from "prop-types"
import { connect } from "react-redux"
import { likeBlog, deleteBlog
  //initializeBlogs
} from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import Blog from "./Blog"

const BlogList = (props) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlogFromList = (blog) => {
    // const blog = blogs.find(b => b.id === id)
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    try {
      props.deleteBlog(blog.id)
      props.setNotification({
        message: `Blog ${blog.title} by ${blog.author} successfully removed!`,
        type: "blogMessage",
        timeout: 5000
      })
    } catch (exception) {
      props.setNotification({
        message: `Error encountered: ${exception}`,
        type: "error",
        timeout: 5000
      })
    }
  }

  const displayBlogs = () => {
    return props.blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        like={() => likeBlog(blog)}
        remove={() => deleteBlogFromList(blog, blog.id)}
        user={blog.user}
        creator={blog.user.username === blog.user.username}
      />
    )
  }


  return (
    <div style={blogStyle}>
      {/* {props.blogs.map(blog =>
        <div key={blog.id}>
          <div onClick={() => setExpanded(!expanded)} className='name'>
            {blog.title} {blog.author}
          </div>
          <a href={blog.url}>{blog.url}</a>
          <div>{blog.likes} likes
            <button onClick={addLikeToBlog}>like</button>
          </div>
          <div>added by {blog.user.name}</div>
        </div>
      )} */}
      {displayBlogs()}
    </div>
  )
}

// const mapStateToProps = state => {
//   console.log("mapStateToProps's State in Bloglist.js: ", state)
//   return {
//     blogs: state.blogs
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    likeBlog: blog => dispatch(likeBlog(blog)),
    deleteBlog: blogId => dispatch(deleteBlog(blogId)),
    setNotification: (message, type) => {
      dispatch(setNotification(message, type))
    }
  }
}

export default connect(null, mapDispatchToProps)(BlogList)