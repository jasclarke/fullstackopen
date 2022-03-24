const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./api_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = helper.initialBlogs.map(blog => new Blog(blog).save())
    await Promise.all(blogs)
}, 100000)

test('ensure all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('blog posts unique identifier should be named id', async () => {
    const response = await api.get(`/api/blogs/${helper.initialBlogs[0]._id}`)
    expect(response.body.id).toBeDefined()
})

test('ensure blog posts can be saved', async () => {
    const blog = {
        title: 'Node API Testing with Jest and Supertest',
        url: 'http://jasonclarke.dev',
        author: 'Jason Clarke',
        likes: 9,
    }

    const savedBlog = await api.post('/api/blogs').send(blog)
    const blogs = await helper.blogsInDb()
    
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(savedBlog.body.title).toBe(blog.title)
    expect(savedBlog.body.url).toBe(blog.url)
    expect(savedBlog.body.author).toBe(blog.author)
    expect(savedBlog.body.likes).toBe(blog.likes)    
})