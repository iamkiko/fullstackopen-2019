import React from 'react'
import { connect } from 'react-redux'

const Notification = ({notification}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  // const notification = props.store.getState().notification.content

  return (
    <div>
      {notification ?
      <div style={style}>
        {notification}
      </div>
        : null
      }
     </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)