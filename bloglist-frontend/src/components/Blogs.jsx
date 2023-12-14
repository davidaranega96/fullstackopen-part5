import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'

const Blogs = ({ setNotification }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    setBlogs((prevBlogs) => prevBlogs.sort((a, b) => b.likes - a.likes))
  }, [blogs])

  const createBlog = async (newBlogObject) => {
    try {
      const response = await blogService.postBlog(newBlogObject)
      setBlogs(blogs.concat(response.data))
      setNotification({ message: 'blog added', tone: 'good' })
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setNotification({ message: 'error creating blog', tone: 'bad' })
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      await blogService.deleteBlog(blogToDelete)
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogToDelete.id))
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        tone: 'bad'
      })
    }
  }

  const updateBlog = async (updatedBlog) => {
    try {
      await blogService.putBlog(updatedBlog)
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        tone: 'bad'
      })
    }
  }

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
      )}
      <Togglable buttonLabel='add blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
    </div>
  )
}

Blogs.propTypes = {
  setNotification: PropTypes.func.isRequired
}
Blogs.displayName = 'Blogs'

export default Blogs