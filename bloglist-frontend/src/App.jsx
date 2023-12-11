import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Login from './components/Login'
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    console.log(blogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('initial user', user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const auth = await loginService.login({ username, password })
    if (auth) {
      setUser(auth)
      blogService.setToken(auth.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(auth)
      ) 
    } else {
      console.log('incorrect username or password')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setPassword('')
    window.localStorage.removeItem('loggedUser')
  }

  const handleNewBlog = () => {
    console.log('Adding new blog...')
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
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && notesForm()}
    </div>
  )
}

export default App