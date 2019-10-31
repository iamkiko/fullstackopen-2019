import React from "react"
import { connect } from "react-redux"
// import userReducer from "../reducers/userReducer"
import User from "./User"

const UserList = props => {
  console.log("userlist's props.users: ", props.users)
  const displayUsers = () => {
    return props.users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
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
