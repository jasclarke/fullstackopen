const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: 'The blog post must have a title.'
    },
    author: String,
    url: {
      type: String,
      required: 'The URL for the blog post must be submitted.'
    },
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

blogSchema.set('toJSON', {
  transform: (document, blog) => {
    blog.id = blog._id.toString()
    delete blog._id
    delete blog.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema) 