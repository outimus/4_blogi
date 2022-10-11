const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./listHelper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('there are two blogs', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a blog can be added', async () => {
  const newBlog = {
    title: 'otsikko_3',
    author: 'tekijä_3',
    url: 'www.osoite_3.fi',
    likes: 3,
  }
  console.log('New Blog on ',newBlog)
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain('otsikko_3')
  })

test('a value for likes is placed', async () => {
  const newBlog = {
    title: 'otsikko_3',
    author: 'tekijä_3',
    url: 'www.osoite_3.fi',
    likes: "",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  })

afterAll(() => {
  mongoose.connection.close()
})