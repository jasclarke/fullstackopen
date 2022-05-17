import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog Component', () => {
    let container

    beforeEach(() => {
        const blog = {
            title: 'This is a test',
            author: 'Jason Clarke',
            url: 'http://test.test',
            likes: 0,
            user: {
                name: 'Jason Clarke'
            }
        }

        container = render(<Blog blog={blog} />).container
    })

    test('Blog displays title and author only', () => {
        const title = screen.queryByText('This is a test')
        const author = screen.queryByText('Jason Clarke')
        const blogDetails = container.querySelector('.blog-details')

        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(blogDetails).toHaveStyle('display: none')
    })

    test('Blog details are displayed upon clicking the view button', async () => {
        const viewBtn = screen.getByText('view')
        userEvent.click(viewBtn)
        const blogDetails = container.querySelector('.blog-details')
        expect(blogDetails).not.toHaveStyle('display: none')
    })
})