const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    
    {
        title: "example title 2",
        author: "example author 2",
        url: "example url 2",
        likes: 1,
        id: "63e1ad5fea10b4f7af88dffe"
    },
    {
        title: "example title 1",
        author: "example author 1",
        url: "example url 1",
        likes: 1,
        id: "63e1b6b871099356e05419db"
    }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}