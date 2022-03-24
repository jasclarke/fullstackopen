const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
  })

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    
    if (blog) {
        response.json(blog)
    } else {
        response.statusMessage = 'The requested blog could not be found'
        response.status(404).end()
    }
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = request.body

    if (!blog.hasOwnProperty('likes')) {
        blog.likes = 0
    }

    const blogToSave = new Blog(blog)
    const savedBlog = await blogToSave.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter