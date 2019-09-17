import React from 'react'

const CreateBlog = ({addBlog, blogTitle, setBlogTitle, blogAuthor, setBlogAuthor, blogUrl, setBlogUrl}) => {


    return (
    <div>
        <h2>Create New</h2>
        <form onSubmit={addBlog}>
        <div>
            title:
            <input
            type="text"
            value={blogTitle}
            name="title"
            onChange={({ target }) => setBlogTitle(target.value)}
            />
        </div>
        <div>
            author:
            <input
            type="text"
            value={blogAuthor}
            name="author"
            onChange={({ target }) => setBlogAuthor(target.value)}
            />
        </div>
        <div>
            url:
            <input
            type="text"
            value={blogUrl}
            name="url"
            onChange={({ target }) => setBlogUrl(target.value)}
            />
        </div>            
        <button type="submit">Create</button>
        </form>
    </div>
    )
    }

  export default CreateBlog