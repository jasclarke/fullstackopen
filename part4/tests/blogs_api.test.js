const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
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
}, 100000)

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
}, 100000)

test('ensure blog posts without the likes property gets one and is defined to zero', async () => {
    const blog = {
        title: 'Node API Testing with Jest and Supertest',
        url: 'http://jasonclarke.dev',
        author: 'Jason Clarke',
    }

    const savedBlog = await api.post('/api/blogs').send(blog)

    expect(savedBlog.body.likes).toBeDefined()
    expect(savedBlog.body.likes).toBe(0)
}, 100000)

test('reject blog posts without a title or url with status code 400', async () => {
    const blogOne = {
        author: 'Jason Clarke'
    }

    const blogTwo = {
        title: 'Bad Request 400'
    }

    const blogThree = {
        url: 'http://badrequest400.com'
    }

    const savedBlogOne = await api.post('/api/blogs').send(blogOne).expect(400)
    const savedBlogTwo = await api.post('/api/blogs').send(blogTwo).expect(400)
    const savedBlogThree = await api.post('/api/blogs').send(blogThree).expect(400)
}, 100000)