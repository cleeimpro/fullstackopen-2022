import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

    test('call createForm with right parameters', async () => {
        const createBlog = jest.fn()
        render(<BlogForm createBlog={createBlog} />)
        const user = userEvent.setup()
        const inputTitle = screen.getByPlaceholderText('title')
        const inputAuthor = screen.getByPlaceholderText('author')
        const inputUrl = screen.getByPlaceholderText('url')

        await user.type(inputTitle, 'aaa')
        await user.type(inputAuthor, 'bbb')
        await user.type(inputUrl, 'ccc')

        const saveButton = screen.getByText('create')
        await user.click(saveButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('aaa')
        expect(createBlog.mock.calls[0][0].author).toBe('bbb')
        expect(createBlog.mock.calls[0][0].url).toBe('ccc')
    })
})
