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

describe('retrieving blog posts', () => {
    test('ensure all blog posts are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 100000)
    
    test('blog posts unique identifier should be named id', async () => {
        const response = await api.get(`/api/blogs/${helper.initialBlogs[0]._id}`)
        expect(response.body.id).toBeDefined()
    }, 100000)
})

describe('adding blog posts', () => {
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
    
        await api.post('/api/blogs').send(blogOne).expect(400)
        await api.post('/api/blogs').send(blogTwo).expect(400)
        await api.post('/api/blogs').send(blogThree).expect(400)
    }, 100000)
})

describe('deleting blog posts', () => {
    test('ensure blog posts is deleted upon request', async () => {
        const blogsAtStart = await helper.blogsInDb()
        await api.delete(`/api/blogs/${blogsAtStart[0].id}`).expect(204)
        
        const blogsAfterDeletion = await helper.blogsInDb()
        expect(blogsAfterDeletion).toHaveLength(blogsAtStart.length - 1)
    }, 100000)
})

describe('modifying blog posts', () => {
    test('ensure blog posts can be updated upon request', async () => {
        const blogs = await helper.blogsInDb()
        const blogToUpdate = blogs[0]
        
        blogToUpdate.likes += 1
        const updatedBlog = await api.put(`/api/blogs/${blogs[0].id}`).send(blogToUpdate).expect(200)
        expect(updatedBlog.body.likes).toBe(blogToUpdate.likes)
    }, 100000)
})