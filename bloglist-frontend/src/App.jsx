import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
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
      setNotification({ message: 'Correclty logged in', tone: 'good' })
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

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blog = { title: title, author: author, url: url}

    await blogService.postBlog(blog)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }

  const loginForm = () => {
    return (
      <Login handleLogin={handleLogin} setPassword={setPassword}
        setUsername={setUsername} username={username} password={password} />
    )
  }

  const notesForm = () => {
    return (
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      <NewBlog setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} onSubmit={handleNewBlog} />
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