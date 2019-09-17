const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }  = require('../utils/list_helper')

//data
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]


//tests
describe('dummy', () => {
  test('dummy return one', () => {
      const dummyBlog = [];
      const result = dummy(dummyBlog);
      expect(result).toBe(1);
  });
});

describe('total likes', () => {
    //empty list is zero
    test('of empty list is zero', () => {
      const result = totalLikes([])
        expect(result).toBe(0)
    })
    //list only has one blog equals the likes of that    
    test('when list has only one blog equals the likes of that', () => {
      const result = totalLikes([blogs[1]])
      expect(result).toBe(5)
      })
    //of a bigger list is calculated right - assuming this is total in exercise instructions
    test('of a bigger list is calculated right', () => {
      const result = totalLikes(blogs)
      expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
  test('blog with most likes', () => {
    const result = favoriteBlog(blogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })

describe('most amount of blogs', () => {
    test('author with the most blogs', () => {
      const result = mostBlogs(blogs)
      expect(result).toEqual({
        author: "Robert C. Martin",
        blogs: 3
      })
    })
  })

  describe('most popular author', () => {
    test('author with the most total amount of likes', () =>{
      const result = mostLikes(blogs)
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 17
      })
    })
  })


})