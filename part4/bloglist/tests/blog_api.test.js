const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlog[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlog[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlog[2])
  await blogObject.save()
})

//HTTP GET TEST 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

//ID TEST 4,9*
test('blogs are returned with id, not _id', async () => {
    const response = await api.get('/api/blogs/')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
    console.table(response.body)
})

//HTTP POST TEST 4.10
test('creating a new blog post', async () => {
    const newPost = {
        title: "Hello World",
        author: "Martin Fowler",
        url: "https://hello.world",
        likes: 11
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // const response = await api.get('/api/blogs/')
    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd.length).toBe(helper.initialBlog.length + 1)

    const contents = blogAtEnd.map(post => post.title)
    expect(contents).toContain('Hello World')
})

// Checking if no likes param returns 0 - 4.11

test('default likes to 0 if missing', async () => {
    const newPost = {
        title: "Where are my likes?",
        author: "Unlikeable Man",
        url: "https://nolikes.com",
    }

    await api
    .post('/api/blogs')
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    const blogAtEnd = await helper.blogsInDb()
    const blogLikes = blogAtEnd.map(blog => blog.likes)
    expect(blogLikes[blogLikes.length - 1]).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})