const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1 })
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, password, name } = request.body
    const existingUser = await User.findOne({ username })

    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        })
    }

    if (!password) {
        return response.status(400).json({
            error: 'The password is required.'
        })
    }

    if (password.length < 3) {
        return response.status(400).json({
            error: 'The password must consist of at least three (3) characters.'
        })
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        password: encryptedPassword,
        name,
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = userRouter