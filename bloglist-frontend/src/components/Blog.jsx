import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [show, setShow] = useState(false)

  const LikeButton = () => {
    return (
      <button onClick={() => likeBlog()}>like</button>
    )
  }

  const DeleteButton = () => {
    if (user.username !== blog.user.username) {
      return null
    } else {
      return (
        <button onClick={() => deleteBlog(blog)}>delete</button>
      )
    }
  }

  const likeBlog = () => {
    const updatedBlog = {
      ...blog, likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  if (show) {
    return (
      <div className='blog' id='blog'>
        {blog.title} <br />
        {blog.url} <br />
        {blog.likes} | <LikeButton /> <br />
        {blog.author} <br />
        <DeleteButton/>
        <button onClick={() => {setShow(!show)}} id='delete-blog'>Hide</button> <br />
      </div>
    )
  } else {
    return (
      <div className='blog'>
        {blog.title} <DeleteButton/> <button onClick={() => setShow(!show)} id='show-blog'>Show</button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func
}
Blog.displayName = 'Blog'

export default Blog