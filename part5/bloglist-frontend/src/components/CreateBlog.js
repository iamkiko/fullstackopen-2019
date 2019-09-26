import React from "react"
import PropTypes from "prop-types"

const CreateBlog = ({ addBlog, title, author, url }) => {
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
                title:
          <input
            {...title.excludeReset}
          />
        </div>
        <div>
                author:
          <input
            {...author.excludeReset}
          />
        </div>
        <div>
                url:
          <input
            {...url.excludeReset}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default CreateBlog