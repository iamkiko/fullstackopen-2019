const dummy = (blogs) => {
   return 1
  }
  
const totalLikes = blogs => blogs.reduce((sum, { likes }) => sum + likes, 0) //need to destructure to avoid [object, object] error

const favoriteBlog = blogs =>  blogs.reduce((a , b) => {
        return a.likes > b.likes
        ? {title: a.title, author: a.author, likes: a.likes}
        : {title: b.title, author: b.author, likes: b.likes}
    })

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }
  