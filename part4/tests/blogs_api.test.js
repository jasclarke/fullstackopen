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