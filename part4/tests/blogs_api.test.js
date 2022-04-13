const mongoose = require('mongoose')
const config = require('../utils/config')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./api_helper')

let token = 'bearer '
let userId

beforeAll( async () => {
    await mongoose.connect(config.MONGODB_URI)
    await User.deleteMany({})
    const user = await helper.addUser()
    token += helper.generateToken(user._id, user.username)
    userId = user._id
}, 1000000)

beforeEach ( async () => {
    await Blog.deleteMany({})
    const user = await User.findById(userId)
    const blogs = helper.initialBlogs.map(blog => {
        blog.user = user._id
        new Blog(blog).save()
    })

    await Promise.all(blogs)

    const blogsFromDb = await helper.blogsInDb()

    blogsFromDb.forEach(blog => {
        user.blogs = user.blogs.concat(blog.id)
    })

    await user.save()
}, 1000000)

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
        
        const savedBlog = await api.post('/api/blogs').send(blog).set({ 'Authorization': token})
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
    
        const savedBlog = await api.post('/api/blogs').send(blog).set({ 'Authorization': token })
    
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
    
        await api.post('/api/blogs').send(blogOne).set({ 'Authorization': token}).expect(400)
        await api.post('/api/blogs').send(blogTwo).set({ 'Authorization': token}).expect(400)
        await api.post('/api/blogs').send(blogThree).set({ 'Authorization': token}).expect(400)
    }, 100000)

    test('reject blog post without token', async () => {
        const initialBlogs = await helper.blogsInDb()

        const blog = {
            title: 'Rejected Blog',
            url: 'http://jasonclarke.dev',
            author: 'Jason Clarke',
            likes: 9,
        }
        
        await api.post('/api/blogs').send(blog).expect(401)
        const blogs = await helper.blogsInDb()

        expect(blogs.length).toBe(initialBlogs.length)
    }, 1000000)
})

describe('deleting blog posts', () => {
    test('ensure blog posts is deleted upon request', async () => {
        const blogsAtStart = await helper.blogsInDb()
        await api.delete(`/api/blogs/${blogsAtStart[0].id}`).set({ 'Authorization': token }).expect(204)
        
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

describe('Invalid users are not created and returns appropriate status code and error message', () => {
    test('Adding a user with no username', async () => {
        const invalidUser = {
            username: '',
            password: 'test',
            name: 'James',
        }

        const response = await api.post('/api/users')
            .send(invalidUser)
            .expect(400)
        
        const message = JSON.parse(response.text)
        expect(message.error).toBe('User validation failed: username: Username is required.')
    }, 100000)

    test('Adding a user with a username of two characters', async () => {
        const invalidUser = {
            username: 'te',
            password: 'test',
            name: 'James',
        }

        const response = await api.post('/api/users')
            .send(invalidUser)
            .expect(400)
        
        const message = JSON.parse(response.text)
        expect(message.error).toBe('User validation failed: username: The username must be atleast three (3) characters long.')
    }, 100000)

    test('Adding a user with no password', async () => {
        const invalidUser = {
            username: 'test',
            password: '',
            name: 'James',
        }

        const response = await api.post('/api/users')
            .send(invalidUser)
            .expect(400)
        
        const message = JSON.parse(response.text)
        expect(message.error).toBe('The password is required.')
    }, 100000)

    test('Adding a user with a password of two characters', async () => {
        const invalidUser = {
            username: 'test',
            password: 'te',
            name: 'James',
        }

        const response = await api.post('/api/users')
            .send(invalidUser)
            .expect(400)
        
        const message = JSON.parse(response.text)
        expect(message.error).toBe('The password must consist of at least three (3) characters.')
    }, 100000)
})