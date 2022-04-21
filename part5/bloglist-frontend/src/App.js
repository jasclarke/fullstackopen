import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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

  return (
    <div>
      {
        (user === null) 
          ? <Login storeUser={(user) => setUser(user)} /> 
          : <>
              <Notification notification={notification} />
              <p>{user.name} logged in <button onClick={logOut}>logout</button></p>
              <BlogList 
                blogs={blogs} 
                token={user.token} 
                storeBlog={(blogs) => setBlogs(blogs)} 
                showNotification={(notification) => setNotification(notification)}
                />
            </>
      }
    </div>
  )
}

export default App