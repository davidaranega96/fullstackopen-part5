import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', tone: null })

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({ message: '', tone: null })
    }, 2000)
    return () => clearTimeout(timer)
  }, [notification])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      <Notification notification={notification}/>
      <h2>blogs</h2>
      {!user && <Login setNotification={setNotification} setUser={setUser}/>}
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