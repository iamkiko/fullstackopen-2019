const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const Comment = require("../models/comment")

//fetching all blog posts
blogsRouter.get("/", async (request, response) => {
  // / = /api/blogs
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { comment: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

//fetching individual blog posts
blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

//adding new blog posts
blogsRouter.post("/", async (request, response, next) => {
  const body = request.body
  try {
    if (!request.token || !request.token.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }

    const user = await User.findById(request.token.id)

    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      likes: body.likes || 0,
      user: user._id
      // comment: body.comment
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const result = await Blog.findById(savedBlog._id).populate("user", {
      username: 1,
      name: 1
    })
    response.json(result.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post("/:id/comments", async (request, response, next) => {
  const body = request.body
  console.log("body:", body)
  try {
    const blog = await Blog.findById(request.params.id)
    const comment = new Comment({
      comment: body.comment,
      blog: blog._id
    })
    console.log("body:", body)
    const savedComment = await comment.save()
    blog.comments.push(savedComment)
    await blog.save()
    response.status(201).json(savedComment)
  } catch (exception) {
    next(exception)
  }
})

//comment posts
// blogsRouter.post("/:id/comments", async (request, response, next) => {
//   const body = request.body
//   console.log("body in comment POST method..: ", body)
//   try {
//     const blog = await Blog.findById(request.params.id)
//     const comment = new Comment({
//       comment: body.comment,
//       blog: blog._id
//     })
//     // console.log("body.comment in POST method: ", body.comment)
//     const savedComment = await comment.save()
//     blog.comments.concat(comment)
//     // console.log("savedComment ", savedComment)
//     await blog.save()
//     response.status(201).json(savedComment)
//   } catch (exception) {
//     next(exception)
//   }
// })

//updating existing blog posts
blogsRouter.put("/:id", async (request, response, next) => {
  try {
    if (!request.token || !request.token.id) {
      return response.status(401).json({ error: "token missing or invalid" })
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
    }).populate("user", { username: 1, name: 1 })

    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

//deleting blog posts
blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    if (!request.token || !request.token.id) {
      return response.status(401).json({ error: "token missing or invalid" })
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
