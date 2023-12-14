import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response
}

const putBlog = async (blog) => {
  const url = `${baseUrl}/${blog.id}`
  return await axios.put(
    url,
    { title: blog.title, author: blog.author, likes: blog.likes, user: blog.user.id, url: blog.url }
  )
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${blog.id}`
  return await axios.delete(url, config)
}

export default { getAll, setToken, postBlog, putBlog, deleteBlog }