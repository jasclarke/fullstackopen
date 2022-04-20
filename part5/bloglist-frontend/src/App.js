import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      {
        (user === null) 
          ? <Login storeUser={(user) => setUser(user)} /> 
          : <>
              <p>{user.name} logged in</p>
              <BlogList blogs={blogs} />
            </>
      }
    </div>
  )
}

export default App