const Blog = require('../models/blog')

const initialBlog = [
    {
        title: "my most popular blogpost",
        author: "buddha",
        url: "/zenislife",
        likes: 56
        },
        {
        title: "xx",
        author: "Dalai Lama",
        url: "https://meditation.com/howto",
        likes: 21
        },
        {
        title: "async/await is the bomb",
        author: "FSO",
        url: "https://async.com",
        likes: 6
        }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}

module.exports = {
    initialBlog, nonExistingId, blogsInDb
}