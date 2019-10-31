/* eslint-disable no-fallthrough */
import blogService from "../services/blogs"

//Action Types
export const INITIALIZE_BLOGS = "INITIALIZE_BLOGS"
export const CREATE_BLOG = "CREATE_BLOG"
export const ADD_LIKE = "ADD_LIKE"
export const DELETE_BLOG = "DELETE_BLOG"
//export const ADD_COMMENT = 'ADD_COMMENT'

// const sort = state => state.sort((a, b) => b.likes - a.likes)
//Action Creators

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: INITIALIZE_BLOGS,
      data: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: CREATE_BLOG,
      data: newBlog
    })
  }
}

export const deleteBlog = blogId => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch({
      type: DELETE_BLOG,
      data: blogId
    })
  }
}

export const likeBlog = blogObject => {
  const likedBlog = { ...blogObject, likes: blogObject.likes + 1 }
  const blogId = blogObject.id
  return async dispatch => {
    const updatedBlog = await blogService.update(blogId, likedBlog)
    dispatch({
      type: ADD_LIKE,
      data: updatedBlog
    })
  }
}

//Reducer
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case INITIALIZE_BLOGS:
      return action.data.sort((a, b) => b.likes - a.likes)
    case CREATE_BLOG:
      return [...state, action.data].sort((a, b) => b.likes - a.likes)
    case DELETE_BLOG: {
      console.log("action.data.id: ", action.data)
      const specificBlog = action.data
      return state.filter(blog => blog.id !== specificBlog)
      // return action.data
    }
    case ADD_LIKE: {
      const specificBlog = action.data
      state = [...state]
      //here it adds a like
      return state
        .map(blog => (blog.id !== specificBlog.id ? blog : specificBlog))
        .sort((a, b) => b.likes - a.likes)
    }
    default:
      return state
  }
}

export default blogReducer
