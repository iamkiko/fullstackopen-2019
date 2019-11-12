const dummy = (blogs) => {
   return 1
  }
  
const totalLikes = blogs => blogs.reduce((sum, { likes }) => sum + likes, 0) //need to destructure to avoid [object, object] error

const favoriteBlog = blogs =>  blogs.reduce((a , b) => {
        return a.likes > b.likes
        ? {title: a.title, author: a.author, likes: a.likes}
        : {title: b.title, author: b.author, likes: b.likes}
    })

const mostBlogs = blogs => {
  let sum = {}
  let check = 0;
  let highest;

  blogs.forEach((blog, i) => {
    const author = blogs[i].author
    if (sum[author] === undefined) {
      sum[author] = 1
    } else {
      sum[author] = sum[author]++
    }

    if (sum[author] > check) {
      check = sum[author]
      highest = blogs[i]
    }
  })

  return {
    author: highest.author,
    blogs: check //number of blogs
  }
}

const mostLikes = blogs => {
  let totalLikes = 0

  const mostPopular = blogs.reduce((a, b) => a.totalLikes > b.totalLikes
    ? a
    : b 
  )

  blogs.forEach(blog => blog.author === mostPopular.author
    ? totalLikes += blog.totalLikes
    : 0
  )

  return {
    author: mostPopular.author,
    totalLikes: totalLikes
  }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
  