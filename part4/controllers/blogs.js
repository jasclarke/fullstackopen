const blogsRouter = require('express').Router()
const { response } = require('../app')
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
    const blog = {
        title: request.body.title,
        url: request.body.url,
        author: request.body.author || '',
        likes: request.body.likes || 0
    }

    const blogToSave = new Blog(blog)
    const savedBlog = await blogToSave.save()
    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = {
        title: request.body.title,
        url: request.body.url,
        author: request.body.author,
        likes: request.body.likes
    }

    const options = {
        new: true,
        runValidators: true,
        context: 'query'
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, options)
    response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter