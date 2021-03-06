const blogsRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor
const Blog = require('../models/blog')

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
  
blogsRouter.post('/', userExtractor, async (request, response) => {
    const user = request.user
    
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

blogsRouter.put('/:id', userExtractor, async (request, response) => {
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

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({
            error: 'The requested blog does not exist'
        })
    }

    const user = request.user

    if (!user) {
        return response.status(404).json({
            error: 'The user account no longer exists'
        })
    }

    if (!(blog.user.toString() === user._id.toString())) {
        return response.status(401).json({
            error: 'Only the creator of the blog can delete it'
        })
    }

    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
    await user.save()
    response.status(204).end()
})

module.exports = blogsRouter