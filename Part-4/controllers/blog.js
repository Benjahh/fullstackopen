const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    const blog = await Blog.find({})
    response.json(blog)
})

blogRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    blog ? response.json(blog) : response.status(404).end()
})

blogRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
    
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    await blog.save()
    response.json(blog)
    response.status(200).end()
    
})
blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.title,
        url: body.url,
        likes: body.likes
    }

    updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    
    response.json(updatedNote)


})




module.exports = blogRouter