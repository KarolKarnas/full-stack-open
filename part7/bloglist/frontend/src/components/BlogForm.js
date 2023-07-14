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
		<div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
			<form onSubmit={addBlog}>
				<h2>Create new</h2>
				<input
				id='title'
				className='w-full pr-40 bg-gray-200 input input-sm text-black mb-2'
					value={newTitle}
					placeholder='title'
					onChange={({ target }) => setNewTitle(target.value)}
					// onChange={(event) => setNewTitle(event.target.value)}
				/>
				<br />
				<input
				id='author'
				className='w-full pr-40 bg-gray-200 input input-sm text-black mb-2'
					value={newAuthor}
					placeholder='author'
					onChange={({ target }) => setNewAuthor(target.value)}
				/>
				<br />
				<input
				id='url'
				className='w-full pr-40 bg-gray-200 input input-sm text-black mb-2'
					value={newUrl}
					placeholder='url'
					onChange={({ target }) => setNewUrl(target.value)}
				/>
				<br />
				<button id='blogSaveBtn' type='submit' className='w-36 btn bg-gray-300 btn-md' >save</button>
			</form>
		</div>
	)
}

export default BlogForm
