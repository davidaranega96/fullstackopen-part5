import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [show, setShow] = useState(false)

  const LikeButton = () => {
    return (
      <button onClick={() => likeBlog()}>like</button>
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
        <button onClick={() => {setShow(!show)}}>Hide</button> <br />
      </div>  
    )
  } else {
    return (
      <div className='blog'>
        {blog.title} <button onClick={() => setShow(!show)}>Show</button>
      </div>  
    )
  }
}

export default Blog