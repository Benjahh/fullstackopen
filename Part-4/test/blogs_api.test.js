const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')



test('blogs are returned as json', async () => {
    await api
    .get('/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

})
test('there are two blogs', async () => {
    const response = await api.get('/blogs')
  
    expect(response.body).toHaveLength(2)
  })
  
test('The _id property exists', async () => {
  const response = await api.get('/blogs')
  console.log(response.body)
  expect(response.body[0].id).toBeDefined
  
}) 

test('Blog deletion with an id', async () => {
  const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete)

    await api
      .delete(`/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.content)

    expect(contents).not.toContain(blogToDelete.content)
})

test('Find and update a blog', async () => {
  const newBlog = {
    title: 'Updated title',
    author: 'Updated author', 
    url: 'updated url',
    likes: 50
  }

  const allBlogs = await helper.blogsInDb()
  console.log(allBlogs)
  const blogToBeUpdated = allBlogs[0]
  console.log(blogToBeUpdated)

  await api
  .put(`/blogs/${blogToBeUpdated.id}`)
  .send(newBlog)
  expect(200)

})

afterAll(async () => {
    await mongoose.connection.close
})