import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('Blog displays title and author only', () => {
    const blog = {
        title: 'This is a test',
        author: 'Jason Clarke',
        url: 'http://test.test',
        likes: 0,
        user: {
            name: 'Jason Clarke'
        }
    }

    let container = render(<Blog blog={blog} />).container

    const title = screen.queryByText('This is a test')
    const author = screen.queryByText('Jason Clarke')
    const blogDetails = container.querySelector('.blog-details')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(blogDetails).toHaveStyle('display: none')
})