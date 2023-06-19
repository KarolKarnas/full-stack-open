import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

	test("By default component renders blog's author and title, and not renders url and likes", () => {
		const blog = {
			title: 'Test',
			author: 'E. W. Dijkstra',
			url: 'www.dijkstra.com',
			likes: 100,
			user: {
				username: 'admin',
				name: 'admin admin',
				id: '648420968437325b074af387',
			},
			id: '648c09e883d3ee38f0f23e35',
		}

		const { container } = render(<Blog blog={blog} />)

		const defaultVisibleTitle = container.querySelector('.defaultVisibleTitle')
		expect(defaultVisibleTitle.parentElement).not.toHaveStyle('display: none')

		const defaultVisibleAuthor = container.querySelector('.defaultVisibleAuthor')
		expect(defaultVisibleAuthor.parentElement).not.toHaveStyle('display: none')

		const url = container.querySelector('.url')
		expect(url.parentElement).toHaveStyle('display: none')

		const likes = container.querySelector('.likes')
		expect(likes.parentElement).toHaveStyle('display: none')

	})
})
