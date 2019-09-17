const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => { // / = /api/blogs
   const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    try{
      const blog = await Blog.findById(request.params.id)
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    } catch(exception) {
      next(exception)
    }
  })

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
      if(!request.token || !request.token.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

    const user = await User.findById(request.token.id)

    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        likes: body.likes || 0,
        user: user._id
    })
  
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
  })

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    if(!request.token || !request.token.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    response.json(updatedBlog.toJSON())
    } catch (exception) {
      next(exception)
    }
  })
  

blogsRouter.delete('/:id', async (request, response, next) => {
 
  try {
    if(!request.token || !request.token.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findOne({ username: request.token.username })
      const blog = await Blog.findById(request.params.id)

      if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } else {
        response.status(401).end()
    } 
  } catch (exception) {
        next(exception)
    }
})




module.exports = blogsRouter