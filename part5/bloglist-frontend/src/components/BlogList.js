import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, updateBlog}) => {
    let blogsCopy = [...blogs]
    blogsCopy.sort((a, b) => b.likes - a.likes)

    return (
        <div>
          <h2>blogs</h2>
          { blogsCopy.map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />) }
        </div>
    )
}

export default BlogList