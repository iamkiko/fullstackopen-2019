import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = props.store.getState().notification.content

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

export default Notification