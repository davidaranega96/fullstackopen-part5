import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from './BlogForm'

describe('AddBlog component', () => {
  let createBlogMock
  let user

  beforeEach(() => {
    user = userEvent.setup()
    createBlogMock = jest.fn()
  })

  test('submits a new blog correctly', async () => {
    const component = render(<AddBlog createBlog={createBlogMock} />)

    const titleInput = component.container.querySelector('#title-input')
    const urlInput = component.container.querySelector('#url-input')
    const authorInput = component.container.querySelector('#author-input')
    const addButton = component.getByText('Add Blog')

    await user.type(titleInput, 'Test Title')
    await user.type(urlInput, 'http://example.com')
    await user.type(authorInput, 'Test Author')
    user.click(addButton)

    await waitFor(() => {
      expect(createBlogMock).toHaveBeenCalledTimes(1)
      expect(createBlogMock).toHaveBeenCalledWith({
        title: 'Test Title',
        url: 'http://example.com',
        author: 'Test Author',
      })
    })
  })
})