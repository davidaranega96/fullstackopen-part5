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
    <form onSubmit={handleNewBlog} className='BlogForm'>
      <div>
        title
        <input
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id='title-input'
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          id='url-input'
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          id='author-input'
        />
      </div>
      <button type="submit" id='submit-button'>Add Blog</button>
    </form>
  )
}

AddBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}
AddBlog.displayName = 'BlogForm'

export default AddBlog
