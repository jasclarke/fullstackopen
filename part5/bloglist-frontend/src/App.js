import React, { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogAppUser')
    if (loggedUserJSON) setUser(JSON.parse(loggedUserJSON))
  }, [])

  const logOut = () => {
    window.localStorage.removeItem('blogAppUser')
    setUser(null)
  }

  const submitBlog = async blog => {
    blogFormRef.current.toggle()

    try {
      const savedBlog = await blogService.create(blog, user.token)
      setBlogs(blogs.concat(savedBlog))
      setNotification({
        message: `${savedBlog.title} by ${savedBlog.author} was added`,
        type: 'success'
      })

      setTimeout(() => setNotification(null), 5000)
    } catch (error) {
      setNotification({
        message: error.response.statusText,
        type: 'error'
      })

      setTimeout(() => setNotification(null), 5000)
    }
  }

  return (
    <div>
      {
        (user === null) 
          ? <Login storeUser={(user) => setUser(user)} /> 
          : <>
              <Notification notification={notification} />
              <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
              <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
                <BlogForm submitBlog={submitBlog} />
              </Togglable>
              <BlogList blogs={blogs} />
            </>
      }
    </div>
  )
}

export default App