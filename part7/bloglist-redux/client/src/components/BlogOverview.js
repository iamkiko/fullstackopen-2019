import React from "react"
import { Link } from "react-router-dom"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

const BlogOverview = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    // border: "solid",
    // borderWidth: 1,
    marginBottom: 5,
    backgroundColor: "#F8F8F8",
  }

  return (
    // <div style={blogStyle}>
    <Container fixed>
      <div>
        <Typography component="div" style={blogStyle}>
          <Link to={`blogs/${blog.id}`}>
            {blog.title} ({blog.author})
          </Link>
        </Typography>
      </div>
    </Container>
    // </div>
  )
}

export default BlogOverview
