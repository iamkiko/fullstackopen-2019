import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import { logout } from "../reducers/loginReducer"

import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}))

const Navigation = props => {
  const classes = useStyles()

  const navStyle = {
    backgroundColor: "#F8F8F8",
    padding: ".5rem",
  }

  const handleLogout = () => {
    props.logout()
    // blogService.destroyToken()
    window.localStorage.removeItem("loggedBlogAppUser")
  }

  return (
    <div style={navStyle}>
      <Typography>
        <Link to="/">Blogs</Link> <Link to="/Users">Users</Link>
        {" - "}
        {props.currentUser && (
          <span>
            {props.currentUser.name} logged in{" "}
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              size="small"
              onClick={handleLogout}
              data-cy="logout"
            >
              Log out
            </Button>
          </span>
        )}
      </Typography>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.login,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
