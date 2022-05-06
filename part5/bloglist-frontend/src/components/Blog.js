import React, { useState } from 'react'

const Blog = ({blog, updateBlog}) => {
  const [visible, setVisible] = useState(false)
  const showBlog = { display: visible ? '' : 'none' }

  const likeBlog = post => {
    post.likes += 1
    updateBlog(post)
  }

  return (
    <div className='blog'>
      <span>{blog.title} {blog.author} </span>
      <button onClick={() => setVisible(!visible)}>{ visible ? 'hide' : 'view' }</button>
      <div style={showBlog}>
        <div><span>{blog.url}</span></div>
        <div>
          <span>{blog.likes} </span>
          <button onClick={() => likeBlog(blog)}>like</button>
        </div>
        <div><span>{blog.user.name}</span></div>
      </div>
    </div>
  ) 
}

export default Blog