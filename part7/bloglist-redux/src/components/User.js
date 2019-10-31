import React from "react"
import PropTypes from "prop-types"

const User = ({ user }) => {
  console.log("User.js details function's prop.user: ", user)
  //need to map through user and put
  // const details = () => {
  //   return user.map(user => (
  //     <tr key={user.id}>
  //       <td>{user.name}</td>
  //       <td>{user.blogs}</td>
  //     </tr>
  //   ))
  // }

  // return <tbody>{details()}</tbody>

  return <div>{user.name}</div>
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User
