const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


// beforeEach(async () => {
//   await Blog.deleteMany({});
//   await Promise.all(helper.blogs.map(blog => new Blog(blog).save()));
// });

beforeEach(async () => {
  await Blog.deleteMany({})
  // await Promise.all(helper.blogs.map(blog => new Blog(blog).save()));
  const blogObjects = helper.initialBlog.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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

//checking if a blogpost without title or url fails to be added
test('blogpost without url or title is not added', async () => {
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

  // await Promise.all(helper.promiseArray.map(async (blog, i) => {
  //   if (i === 0) delete blog.title;
  //   else delete blog.url;
  //   await api
  //       .post('/api/blogs')
  //       .send(blog)
  //       .expect(400);
// }));
})


afterAll(() => {
  mongoose.connection.close()
})