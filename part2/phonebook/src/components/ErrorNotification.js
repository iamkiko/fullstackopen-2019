<<<<<<< HEAD
import React from 'react'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

  export default ErrorNotification
||||||| merged common ancestors
=======
import React from 'react'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

  export default ErrorNotification
>>>>>>> 4485d87913d18963e60650c66c8ab6f2831fa7f0
