const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  // await Promise.all(helper.blogs.map(blog => new Blog(blog).save()));
  
  const blogObjects = helper.initialBlog.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  // for (let blog of helper.initialBlog) {
  //   let blogObject = new Blog(blog)
  //   await blogObject.save()
  // }
})


describe('returning the blogs', () => {
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
})


describe('adding blog posts', () => {
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

    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd.length).toBe(helper.initialBlog.length + 1)

    const contents = blogAtEnd.map(post => post.title)
    expect(contents).toContain('Hello World')
  })

  // Checking if no likes param returns 0 - 4.11
  test('default likes to 0 if missing from new blogpost', async () => {
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

  //checking if a blogpost without title or url fails to be added - 4.12
  test('adding blogpost without url or title returns 400', async () => {
  const newPost = {
    author: "Ninja",
    likes: 3
  }

  await api
  .post('/api/blogs')
  .send(newPost)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()

  expect(blogAtEnd.length).toBe(helper.initialBlog.length)
  })
})

describe('deleting a blogpost', () => {
  test('succeeds with 204 if it finds it', async () => {
    const blogAtStart = await helper.blogsInDb()
    const postToDelete = blogAtStart[0]

    console.log('blogid:', postToDelete.id)

    await api
    .delete(`/api/blogs/${postToDelete.id}`)
    .expect(204)

    const blogAtEnd = await helper.blogsInDb()

    expect(blogAtEnd.length).toBe(helper.initialBlog.length - 1)

    const contents = blogAtEnd.map(post => post.title)
    expect(contents).not.toContain(postToDelete.title)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'iamkiko',
      name: 'Christos',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})



afterAll(() => {
  mongoose.connection.close()
})