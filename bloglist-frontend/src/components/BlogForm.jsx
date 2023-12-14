import { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      url: url,
      author: author
    }
    createBlog(newBlog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }


  return (
    <form onSubmit={handleNewBlog}>
      <div>
        title
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  )
}

AddBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}
AddBlog.displayName = 'BlogForm'

export default AddBlog
