import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
	test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
		const createBlog = jest.fn()
		const user = userEvent.setup()

		render(<BlogForm createBlog={createBlog} />)

		const titleInput = screen.getByPlaceholderText('title')
		const authorInput = screen.getByPlaceholderText('author')
		const urlInput = screen.getByPlaceholderText('url')
		const sendButton = screen.getByText('save')

		await user.type(titleInput, 'Test')
		await user.type(authorInput, 'E. W. Dijkstra')
		await user.type(urlInput, 'www.dijkstra.com')

		await user.click(sendButton)

		expect(createBlog.mock.calls[0][0]).toEqual({
			title: 'Test',
			author: 'E. W. Dijkstra',
			url: 'www.dijkstra.com',
		})
	})
})
