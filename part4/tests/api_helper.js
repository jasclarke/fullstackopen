const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const generateToken = (id, username) => {
    return jwt.sign(
        { username, id },
        process.env.SECRET,
        { expiresIn: 60*60 }
    )
}

const addUser = async () => {
    const encryptedPassword = await bcrypt.hash('password', 10)

    const user = new User({
        username: 'jclarke',
        password: encryptedPassword,
        name: 'Jason Clarke'
    })

    return await user.save()
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb,
    addUser,
    generateToken
}