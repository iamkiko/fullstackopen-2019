import React from "react"
import PropTypes from "prop-types"

const LoginForm = ({ handleLogin, username, password }) => {


  return (

    <form onSubmit={handleLogin}>
      <div>
            username:
        <input
          {...username}
        />
      </div>
      <div>
            password:
        <input
          {...password}
        />
      </div>
      <button type="submit">Login!</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}
export default LoginForm