import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('Ensure form submits with the entered data', async () => {
    const mockFunction = jest.fn()
    const user = userEvent.setup()

    const container = render(<BlogForm submitBlog={ mockFunction } />).container

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const submitButton = screen.getByText('Create Blog')

    await user.type(title, 'Test Blog')
    await user.type(author, 'John Doe')
    await user.type(url, 'http://test.test')
    await user.click(submitButton)

    expect(mockFunction.mock.calls).toHaveLength(1)
    expect(mockFunction.mock.calls[0][0].title).toBe('Test Blog')
    expect(mockFunction.mock.calls[0][0].author).toBe('John Doe')
    expect(mockFunction.mock.calls[0][0].url).toBe('http://test.test')
})