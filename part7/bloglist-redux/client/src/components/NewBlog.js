import React from "react"

const NewBlog = ({ author, title, url, addBlog, newBlogRef }) => {
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
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlog
