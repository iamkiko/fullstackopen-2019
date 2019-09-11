const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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
        title: "xx",
        author: "Dalai Lama",
        url: "https://meditation.com/howto",
        likes: 21
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs/')

    const contents = response.body.map(post => post.title)
    expect(response.body.length).toBe(6)
    expect(contents).toContain('xx')
})


afterAll(() => {
  mongoose.connection.close()
})