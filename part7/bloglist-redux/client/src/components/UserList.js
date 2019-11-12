import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import User from "./User"

const UserList = props => {
  console.log("userlist's props.users: ", props.users)
  const displayUsers = () => {
    return props.users.map(user => (
      <tr key={user.id}>
        <td>
          <Link to={`users/${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    ))
  }
  return (
    <div>
      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>{displayUsers()}</tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(UserList)
