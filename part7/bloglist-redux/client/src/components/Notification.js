import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const Notification = ({ message, type }) => {
  if (message === undefined || !message) {
    return null
  }

  const notificationStyle = {
    color: type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  let displayStyle = null
  type === "error"
    ? (displayStyle = { ...notificationStyle, color: "red" })
    : (displayStyle = { ...notificationStyle, color: "green" })

  return <div style={displayStyle}>{message}</div>
}

const mapStateToProps = state => {
  return {
    message: state.notification.message,
    type: state.notification.type,
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
}
export default connect(mapStateToProps)(Notification)
