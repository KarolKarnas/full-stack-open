import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])

	const [successMessage, setSuccessMessage] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const blogFormRef = useRef()

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

	const addBlog = async (blogObject) => {
		blogFormRef.current.toggleVisibility()
		try {
			const response = await blogService.create(blogObject)
			const blog = response.data
			setBlogs(blogs.concat(blog))
			setSuccessMessage(`a new blog ${blog.title}! By ${blog.author} added!`)
			setTimeout(() => {
				setSuccessMessage(null)
			}, 5000)
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
					<Togglable buttonLabel='add new blog!' ref={blogFormRef}>
						<BlogForm createBlog={addBlog} />
					</Togglable>
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
