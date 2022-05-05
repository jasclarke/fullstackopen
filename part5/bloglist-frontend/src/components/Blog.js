import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  const showBlog = { display: visible ? '' : 'none' }

  return (
    <div className='blog'>
      <span>{blog.title} {blog.author} </span>
      <button onClick={() => setVisible(!visible)}>{ visible ? 'hide' : 'view' }</button>
      <div style={showBlog}>
        <span className='blog-details'>{blog.url}</span>
        <span className='blog-details'>{blog.likes}</span>
        <span className='blog-details'>{blog.user.name}</span>
      </div>
    </div>
  ) 
}

export default Blog