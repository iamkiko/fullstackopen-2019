import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../reducers/loginReducer"

const Navigation = props => {
  const navStyle = {
    backgroundColor: "#DCDCDC",
    padding: ".5rem"
  }

  const handleLogout = () => {
    props.logout()
    // blogService.destroyToken()
    window.localStorage.removeItem("loggedBlogAppUser")
  }

  return (
    <div style={navStyle}>
      <Link to="/">Blogs</Link> <Link to="/">Users</Link>{" "}
      {props.currentUser && (
        <span>
          {props.currentUser.name} logged in{" "}
          <button onClick={handleLogout}>Log out</button>
        </span>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
