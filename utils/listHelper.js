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
    favoriteBlog
  }