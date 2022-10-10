const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('.../models/blog')
const initialBlogs = require('./tests/listHelper').initialBlogs

beforeEach(async () => {
await Blog.deleteMany({})
await Blog.insertMany(initialBlogs)
})

test('there are two blogs', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  })

afterAll(() => {
  mongoose.connection.close()
})