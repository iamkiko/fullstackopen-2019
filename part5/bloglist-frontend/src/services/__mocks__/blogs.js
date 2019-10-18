const blogs = [
  {
    title: "testing blogs",
    author: "mr test",
    url: "www.test.com",
    likes: 4,
    user: [
      {
        username: "iamkiko",
        name: "Christos",
        id: "5d7de58a467ea83a046dea6a"
      }
    ],
    id: "5d7e09c5773a971164eaf4f5"
  },
  {
    title: "Test number 2",
    author: "mrs test",
    url: "www.testagain.com",
    likes: 14,
    user: [
      {
        username: "MR TEST",
        name: "TEST",
        id: "2342"
      }
    ],
    id: "323sd3"
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken, blogs }