import React from "react"
// import PropTypes from "prop-types"
import { connect } from "react-redux"
import BlogOverview from "./BlogOverview"

const BlogList = props => {
  const displayBlogs = () => {
    return props.blogs.map(blog => <BlogOverview key={blog.id} blog={blog} />)
  }

  return <div>{displayBlogs()}</div>
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    id: state.login.id,
  }
}

export default connect(mapStateToProps, null)(BlogList)
