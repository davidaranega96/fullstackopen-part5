import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
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
      setNotification({ message: 'incorrect username or password', tone: 'bad' })
    }
  }

  const handleLogout = () => {
    setUser(null)
    setPassword('')
    window.localStorage.removeItem('loggedUser')
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <Login handleLogin={handleLogin} setPassword={setPassword}
        setUsername={setUsername} username={username} password={password} />
      </Togglable>
    )
  }

  return (
    <div>
      <Notification notification={notification}/>
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && 
      <div>
        logged in as {user.name} <button onClick={handleLogout}>logout</button>
        <Blogs setNotification={setNotification} />
      </div>
        }
    </div>
  )
}

export default App