import React from "react"
import { connect } from "react-redux"
import { useField } from "../hooks"
import { setNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"

const NewBlog = ({
  setNotification,
  createBlog,
  newBlogRef
}) => {
  const [title, titleReset] = useField("text")
  const [author, authorReset] = useField("text")
  const [url, urlReset] = useField("text")

  const handleSubmit = async event => {
    event.preventDefault()
    newBlogRef.current.toggleVisibility()
    const newBlogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    try {
      createBlog(newBlogObject)
      titleReset()
      authorReset()
      urlReset()
      setNotification({
        message: `Blog ${newBlogObject.title} by ${newBlogObject.author} successfully added!`,
        type: "blogMessage",
        timeout: 5000
      })
    } catch (error) {
      setNotification({
        message: `Unable to add blog. Error: ${error}`,
        type: "error",
        timeout: 5000
      })
    }
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

const ConnectedNewBlog = connect(
  null,
  mapDispatchToProps
)(NewBlog)

export default ConnectedNewBlog