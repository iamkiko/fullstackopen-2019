import React from "react"
// import PropTypes from "prop-types"
import { connect } from "react-redux"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"
import Blog from "./Blog"

const BlogList = props => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }
  const notify = (message, type = "success") => {
    props.setNotification({ message, type })
    setTimeout(
      () => props.setNotification({ message: null, type: null }),
      10000
    )
  }

  const deleteBlogFromList = blog => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    try {
      props.deleteBlog(blog.id)
      notify(`Blog ${blog.title} by ${blog.author} successfully removed!`)
    } catch (exception) {
      notify(`Error encountered: ${exception}`)
    }
  }

  const displayBlogs = () => {
    return props.blogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        like={() => props.likeBlog(blog)}
        remove={() => deleteBlogFromList(blog)}
        user={blog.user}
        loggedInUser={props.loggedInUser}
      />
    ))
  }

  return <div style={blogStyle}>{displayBlogs()}</div>
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    id: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    likeBlog: blog => dispatch(likeBlog(blog)),
    deleteBlog: blogId => dispatch(deleteBlog(blogId)),
    setNotification: (message, type) => {
      dispatch(setNotification(message, type))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
