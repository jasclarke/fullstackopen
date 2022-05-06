import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, updateBlog}) => {
    return (
        <div>
          <h2>blogs</h2>
          {
            blogs.map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />)
          }
        </div>
    )
}

export default BlogList