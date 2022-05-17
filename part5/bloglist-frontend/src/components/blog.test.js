import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Blog Component', () => {
    let container, mockFunction

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

        mockFunction = jest.fn()
        container = render(<Blog blog={blog} updateBlog={mockFunction} />).container
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
        const user = userEvent.setup()
        const blogDetails = container.querySelector('.blog-details')
        const viewBtn = screen.getByText('view')

        await user.click(viewBtn)

        expect(blogDetails).not.toHaveStyle('display: none')
    })

    test('Ensure event handler of like button is called twice when clicked twice', async () => {
        const user = userEvent.setup()
        const likeBtn = screen.getByText('like')

        await user.click(likeBtn)
        await user.click(likeBtn)

        expect(mockFunction.mock.calls).toHaveLength(2)
    })
})