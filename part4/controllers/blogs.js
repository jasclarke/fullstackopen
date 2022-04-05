const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
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
    const user = await User.findById(request.body.user)
    
    const blog = {
        title: request.body.title,
        url: request.body.url,
        author: request.body.author || '',
        likes: request.body.likes || 0,
        user: user._id
    }

    const blogToSave = new Blog(blog)
    const savedBlog = await blogToSave.save()
    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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