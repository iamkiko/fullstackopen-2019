import React from "react"

const CreateBlog = ({ addBlog, title, author, url }) => {
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
                title:
          <input
            {...title}
          />
        </div>
        <div>
                author:
          <input
            {...author}
          />
        </div>
        <div>
                url:
          <input
            {...url}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlog