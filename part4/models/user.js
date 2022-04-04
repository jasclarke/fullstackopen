const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, user) => {
        user.id = user._id.toString()
        delete user._id
        delete user.__v
        delete user.password
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User