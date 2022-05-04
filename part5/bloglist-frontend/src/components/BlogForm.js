import React, { useState } from 'react'

const BlogForm = ({submitBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = async event => {
      event.preventDefault()
      
      submitBlog({ 
        title: title, 
        author: author,
        url: url
      })

      setTitle('')
      setAuthor('')
      setUrl('')
    }

    return (
        <>
            <h2>New Blog</h2>

            <form onSubmit={createBlog}>
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
        </>
    )
}

export default BlogForm