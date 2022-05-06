import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, updateBlog, removeBlog, username}) => {
    let blogsCopy = [...blogs]
    blogsCopy.sort((a, b) => b.likes - a.likes)

    return (
        <div>
          <h2>blogs</h2>
          { blogsCopy.map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} username={username} />) }
        </div>
    )
}

export default BlogList