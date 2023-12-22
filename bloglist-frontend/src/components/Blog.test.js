import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const mockHandler = jest.fn()

const user = userEvent.setup()

const testUser = {
  username: 'test96',
  id: '1234'
}

const testBlog = {
  title: 'testing component blog',
  author: 'test author',
  likes: 0,
  url: 'test.url',
  user: 'test user'
}

test('renders content', () => {
  const component = render(<Blog blog={testBlog} updateBlog={mockHandler} deleteBlog={mockHandler} user={testUser}/>)

  expect(component.container).toHaveTextContent('testing component blog')
})

test('show', async () => {
  const component = render(<Blog blog={testBlog} updateBlog={mockHandler} deleteBlog={mockHandler} user={testUser}/>)
  expect(component.container).toHaveTextContent('testing component blog')
  expect(component.container).not.toHaveTextContent('test.url')
  expect(component.container).not.toHaveTextContent(0)

  await user.click(component.getByText('Show'))

  expect(component.container).toHaveTextContent('testing component blog')
  expect(component.container).toHaveTextContent('test author')
  expect(component.container).toHaveTextContent('test.url')
  expect(component.container).toHaveTextContent(0)
})

test('like clicked twice', async () => {
  const updateBlogMock = jest.fn()
  const component = render(<Blog blog={testBlog} updateBlog={updateBlogMock} deleteBlog={mockHandler} user={testUser}/>)
  await user.click(component.getByText('Show'))

  const likeButton = component.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(updateBlogMock).toHaveBeenCalledTimes(2)
})