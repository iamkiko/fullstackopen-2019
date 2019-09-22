import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

describe('Simpleblog tests', () => {
  test('renders title, author and likes', () => {

    const blog = {
      title: 'testing react frontend',
      author: 'Christos',
      likes: 12
    }
    const component = render(
      <SimpleBlog blog={blog} />
    )

    const blogInfo = component.container.querySelector('.blogInfo')
    expect(blogInfo).toHaveTextContent('testing react frontend')
    expect(blogInfo).toHaveTextContent('Christos')

    const likes = component.container.querySelector('.likes')
    expect(likes).toHaveTextContent(12)
  })

  test('clicking the like button calls event handler twice', () => {
    const blog = {
      title: 'testing react frontend',
      author: 'Christos',
      likes: 12
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})