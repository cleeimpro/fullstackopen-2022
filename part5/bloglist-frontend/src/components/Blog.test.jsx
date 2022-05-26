import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    const blog = {
        title: 'einfach alles easy',
        author: 'ich',
        url: 'www.www.www',
        likes: 3,
    }

    test('renders only title and author', () => {
        render(<Blog blog={blog} />)
        expect(screen.getByText('einfach alles easy')).toBeDefined()
        expect(screen.queryByText('ich')).toBeDefined()
        expect(screen.queryByText('www.www.www')).toBeNull()
    })

    test('after clicking show, url and likes are visible', async () => {
        render(<Blog blog={blog} />)
        const user = userEvent.setup()
        const showButton = screen.getByText('show')
        await user.click(showButton)

        screen.getByText('3 likes')
        screen.getByText('www.www.www')
    })

    test('if like is clicked twice, func get called twice', async () => {
        const likeBlog = jest.fn()
        render(<Blog blog={blog} likeBlog={likeBlog} />)
        const user = userEvent.setup()
        const showButton = screen.getByText('show')
        await user.click(showButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeBlog.mock.calls).toHaveLength(2)
        expect(likeBlog.mock.calls[0][0]).toEqual(blog)
        expect(likeBlog.mock.calls[1][0]).toEqual(blog)
    })
    test('if remove is clicked, func get called', async () => {
        const removeBlog = jest.fn()
        render(<Blog blog={blog} removeBlog={removeBlog} userHasRights={true} />)
        const user = userEvent.setup()
        const showButton = screen.getByText('show')
        await user.click(showButton)

        const removeButton = screen.getByText('remove')
        await user.click(removeButton)

        expect(removeBlog.mock.calls).toHaveLength(1)
        expect(removeBlog.mock.calls[0][0]).toEqual(blog)
    })
})
