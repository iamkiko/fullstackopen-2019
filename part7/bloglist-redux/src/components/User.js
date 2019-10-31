import React from "react"
import PropTypes from "prop-types"

const User = ({ user }) => {
  console.log("User.js details function's prop.user: ", user)
  //conditional to check if user exists?

  if (user === undefined || !user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs:</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User
