import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [show, setShow] = useState(false)

  const LikeButton = () => {
    return (
      <button onClick={() => likeBlog()}>like</button>
    )
  }

  const DeleteButton = () => {
    return (
      <button onClick={() => deleteBlog(blog)}>delete</button>
    )
  }

  const likeBlog = () => {
    const updatedBlog = {
      ...blog, likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  if (show) {
    return (
      <div className='blog'>
        {blog.title} <br />
        {blog.url} <br />
        {blog.likes} | <LikeButton /> <br />
        {blog.author} <br />
        <DeleteButton/>
        <button onClick={() => {setShow(!show)}}>Hide</button> <br />
      </div>
    )
  } else {
    return (
      <div className='blog'>
        {blog.title} <DeleteButton/> <button onClick={() => setShow(!show)}>Show</button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}
Blog.displayName = 'Blog'

export default Blog