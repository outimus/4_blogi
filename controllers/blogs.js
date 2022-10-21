const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blog = require('../models/blog')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.put('/:id', (request, response) => {
  const body = request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }
  Blog.findByIdAndUpdate(request.params.id, updatedBlog)
    .then(response.status(201))
  })

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(body.userId)

  if (!body.title || !body.url) {
    return (response.status(400))
  }
  const blogPayload = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: user._id }
  
  const blog = new Blog(blogPayload)
  await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  response.status(201)
})

blogsRouter.delete('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== userId.toString()) {
    return response.status(401).json( { error: 'Unauthorized' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
  
module.exports = blogsRouter