import React, { useState } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogList = ({blogs, token, storeBlog, showNotification}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async event => {
      event.preventDefault()
      
      try {
        const blog = { 
          title: title, 
          author: author,
          url: url
        }

        const savedBlog = await blogService.create(blog, token)
        
        setTitle('')
        setAuthor('')
        setUrl('')
        storeBlog(blogs.concat(savedBlog))
        showNotification({
          message: `${savedBlog.title} by ${savedBlog.author} was added`,
          type: 'success'
        })

        setInterval(() => {
          showNotification(null)
        }, 5000);
      } catch (error) {
        showNotification({
          message: error.response.statusText,
          type: 'error'
        })

        setInterval(() => {
          showNotification(null)
        }, 5000);
      }
    }

    return (
      <>
        <h2>New Blog</h2>
        <form onSubmit={addBlog}>
          <div>
            <label htmlFor='title'>Title: </label>
            <input type='text' id='title' name='title' value={title} onChange={({target}) => setTitle(target.value)} />
          </div>
          <div>
            <label htmlFor='author'>Author: </label>
            <input type='text' id='author' name='author' value={author} onChange={({target}) => setAuthor(target.value)}/>
          </div>
          <div>
            <label htmlFor='url'>Url: </label>
            <input type='text' id='url' name='url' value={url} onChange={({target}) => setUrl(target.value)} />
          </div>
          <div>
            <input type='submit' value='Create Blog' />
          </div>
        </form>

        <div>
          <h2>blogs</h2>
          {
            blogs.map(blog => <Blog key={blog.id} blog={blog} />)
          }
        </div>
      </>
    )
}

export default BlogList