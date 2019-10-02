import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log("NOTIFICATION: ", props.store)
  return (
    <div style={style}>
      {props.store.getState().notification}
    </div>
  )
}

export default Notification