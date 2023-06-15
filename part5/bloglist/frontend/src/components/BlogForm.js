import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [newTitle, setNewTitle] = useState('')
	const [newUrl, setNewUrl] = useState('')
	const [newAuthor, setNewAuthor] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		})
		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')
	}

	return (
		<form onSubmit={addBlog}>
			<h2>Create new</h2>
			<input
				value={newTitle}
				placeholder='title'
				onChange={({ target }) => setNewTitle(target.value)}
				// onChange={(event) => setNewTitle(event.target.value)}
			/>
			<br />
			<input
				value={newAuthor}
				placeholder='author'
				onChange={({ target }) => setNewAuthor(target.value)}
			/>
			<br />
			<input
				value={newUrl}
				placeholder='url'
				onChange={({ target }) => setNewUrl(target.value)}
			/>
			<br />
			<button type='submit'>save</button>
		</form>
	)
}

export default BlogForm
