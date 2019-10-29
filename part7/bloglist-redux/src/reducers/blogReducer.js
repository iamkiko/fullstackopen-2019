/* eslint-disable no-fallthrough */
import blogService from "../services/blogs"

//Action Types
export const INITIALIZE_BLOGS = "INITIALIZE_BLOGS"
export const CREATE_BLOG = "CREATE_BLOG"
export const ADD_LIKE = "ADD_LIKE"
export const DELETE_BLOG = "DELETE_BLOG"
//export const ADD_COMMENT = 'ADD_COMMENT'

const sort = state => state.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
//Action Creators

export const initializeBlogs = () => {
  return async(dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: INITIALIZE_BLOGS,
      data: blogs
    })
  }
}

export const createBlog = blog => {
  return async(dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: CREATE_BLOG,
      data: newBlog
    })
  }
}

export const deleteBlog = blogId => {
  return async(dispatch) => {
    const blogsAfterDeletion = await blogService.remove(blogId)
    dispatch({
      type: DELETE_BLOG,
      data: blogsAfterDeletion
    })
  }
}

export const likeBlog = blog => {
  const likedBlog = { ...blog, likes: blog.likes + 1 }
  const blogId = blog.id
  return async(dispatch) => {
    const updatedBlog = await blogService.update(blogId, likedBlog)
    dispatch({
      type: ADD_LIKE,
      data: updatedBlog
    })
  }
}

//Reducer
const blogReducer = (state = [], action) => {
  console.log("reducer state", state)
  switch(action.type) {
  case INITIALIZE_BLOGS:{
    return sort(action.data)
  }  
  case CREATE_BLOG:
    return sort([...state, action.data])
  case DELETE_BLOG:{
    return state.filter(blog => blog.id !== action.data.id)
  }
  case ADD_LIKE: {
    const specificBlog = action.data
    return state.map(blog => blog.id !== specificBlog.id ? blog : specificBlog)
  }
  default:
    return state
  }
}

export default blogReducer