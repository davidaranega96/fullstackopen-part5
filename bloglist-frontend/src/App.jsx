import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', tone: null })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({ message: '', tone: null })
    }, 2000)
    return () => clearTimeout(timer)
  }, [notification])

  const handleLogin = async (event) => {
    event.preventDefault()
    const auth = await loginService.login({ username, password })
    if (auth) {
      setUser(auth)
      blogService.setToken(auth.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(auth)
      )
      setNotification({ message: 'correclty logged in', tone: 'good' })
    } else {
      console.log('incorrect username or password')
      setNotification({ message: 'incorrect username or password', tone: 'bad' })
    }
  }

  const handleLogout = () => {
    setUser(null)
    setPassword('')
    window.localStorage.removeItem('loggedUser')
  }

  const createBlog = async (newBlogObject) => {
    try {
      const response = await blogService.postBlog(newBlogObject)
      console.log('newblog response', response)
      setBlogs(blogs.concat(response.data))
      setNotification({ message: 'blog added', tone: 'good' })
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        tone: 'bad'
      })
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <Login handleLogin={handleLogin} setPassword={setPassword}
        setUsername={setUsername} username={username} password={password} />
      </Togglable>
    )
  }

  const notesForm = () => {
    return (
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Togglable buttonLabel='add blog'>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification}/>
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && notesForm()}
    </div>
  )
}

export default App