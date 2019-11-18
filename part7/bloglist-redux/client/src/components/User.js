import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

const User = ({ user }) => {
  //conditional to check if user exists?

  if (user === undefined || !user) {
    return null
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        {user.name}{" "}
      </Typography>
      <Typography variant="h5" gutterBottom>
        has added the following blogs:{" "}
      </Typography>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <Typography>{blog.title}</Typography>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
}

export default User
