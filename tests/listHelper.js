const Blog = require('../models/blog')
const _ = require('lodash')

const initialBlogs = [
  {
    title: 'otsikko_1',
    author: 'tekijä_1',
    url: 'osoite_1',
    likes: 1
  },
  {
      title: 'otsikko_2',
      author: 'tekijä_2',
      url: 'osoite_2',
      likes: 2
  },
]

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map(a => sum += a.likes)
  return sum
}

const favoriteBlog = (blogs) => {
  let b = 0
  let c = {}
  blogs.map(a => {
    if (a.likes > b) {
      b = a.likes,
      c = a
    }
  })
  return c
}

module.exports = {
    totalLikes,
    favoriteBlog,
    initialBlogs
  }