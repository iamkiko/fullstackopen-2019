const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlog, blogsInDb, usersInDb
}