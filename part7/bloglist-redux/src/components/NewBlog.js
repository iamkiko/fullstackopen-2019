import React from "react"
// import { connect } from "react-redux"
// import { setNotification } from "../reducers/notificationReducer"
// import { createBlog } from "../reducers/blogReducer"

const NewBlog = ({
  author,
  title,
  url,
  addBlog,
  newBlogRef
}) => {


  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog} ref={newBlogRef}>
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

export default NewBlog