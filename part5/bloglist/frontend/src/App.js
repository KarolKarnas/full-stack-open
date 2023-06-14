import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [newTitle, setNewTitle] = useState('')
	const [newUrl, setNewUrl] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [successMessage, setSuccessMessage] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})
			localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (error) {
			const message = error.response.data.error
			setErrorMessage(message)
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleLogout = (e) => {
		e.preventDefault()
		blogService.setToken(null)
		localStorage.removeItem('loggedBlogAppUser', JSON.stringify(user))
		setUser(null)
	}

	const addBlog = async (e) => {
		e.preventDefault()
		try {
			const blogObject = {
				title: newTitle,
				author: newAuthor,
				url: newUrl,
			}

			const response = await blogService.create(blogObject)
			const blog = response.data
			setBlogs(blogs.concat(blog))
			setSuccessMessage(`a new blog ${blog.title}! By ${blog.author} added!`)
			setTimeout(() => {
				setSuccessMessage(null)
			}, 5000)
			setNewTitle('')
			setNewAuthor('')
			setNewUrl('')
		} catch (error) {
			const message = error.response.data.error
			setErrorMessage(message)
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit'>login</button>
		</form>
	)

	const handleNewTitleChange = (e) => {
		setNewTitle(e.target.value)
	}
	const handleNewUrlChange = (e) => {
		setNewUrl(e.target.value)
	}

	const handleNewAuthorChange = (e) => {
		setNewAuthor(e.target.value)
	}

	const blogForm = () => (
		<form onSubmit={addBlog}>
			<h2>Create new</h2>
			<input
				value={newTitle}
				placeholder='title'
				onChange={handleNewTitleChange}
			/>
			<br />
			<input
				value={newAuthor}
				placeholder='author'
				onChange={handleNewAuthorChange}
			/>
			<br />
			<input value={newUrl} placeholder='url' onChange={handleNewUrlChange} />
			<br />
			<button type='submit'>save</button>
		</form>
	)

	return (
		<div>
			<h1>Blog list</h1>

			<Notification
				errorMessage={errorMessage}
				successMessage={successMessage}
			/>

			{user === null ? (
				loginForm()
			) : (
				<>
					<p>
						{user.name} logged in <button onClick={handleLogout}>Logout</button>
					</p>
					{blogForm()}
					<h2>Blogs</h2>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			)}

			<Footer />
		</div>
	)
}

export default App
