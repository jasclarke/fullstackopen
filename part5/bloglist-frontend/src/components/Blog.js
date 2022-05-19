import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, username }) => {
    const [visible, setVisible] = useState(false)
    const showBlog = { display: visible ? '' : 'none' }

    const likeBlog = blog => {
        const post = JSON.parse(JSON.stringify(blog))
        post.likes += 1
        updateBlog(post)
    }

    const confirmBlogDeletion = () => window.confirm(`Do you really want to delete ${blog.title} by ${blog.author}`)

    const deleteBlog = blog => {
        if (confirmBlogDeletion()) removeBlog(blog)
    }

    return (
        <div className='blog'>
            <span>{blog.title} {blog.author} </span>
            <button onClick={() => setVisible(!visible)}>{ visible ? 'hide' : 'view' }</button>
            <div className='blog-details' style={showBlog}>
                <div><span>{blog.url}</span></div>
                <div>
                    <span>{blog.likes} </span>
                    <button className='like-btn' onClick={() => likeBlog(blog)}>like</button>
                </div>
                <div><span>{blog.user.name}</span></div>
                {
                    blog.user.username === username && <div><button className='delete-btn' onClick={() => deleteBlog(blog)}>delete</button></div>
                }
            </div>
        </div>
    )
}

export default Blog