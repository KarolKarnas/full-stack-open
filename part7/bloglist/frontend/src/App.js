import { useState, useEffect, useRef, useContext } from 'react'
import NotificationContext from './components/NotificationContext'

import { useQuery, useMutation, useQueryClient } from 'react-query'

import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const { setNotification } = useContext(NotificationContext)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	const blogFormRef = useRef()
	//REACT QUERY
	const queryClient = useQueryClient()

	const result = useQuery('blogs', blogService.getAll)
	const newBlogMutation = useMutation(blogService.create, {
		onSuccess: (res) => {
			if (res.status === 201) {
				const blogObject = res.data
				queryClient.invalidateQueries('blogs')
				setNotification(
					`a new blog ${blogObject.title}! By ${blogObject.author} added!`,
					'SUCCESS'
				)
			}
		},
		onError: (error) => {
			console.log(error)
			setNotification(error.response.data.error, 'ERROR')
		},
	})
	// setBlogs(result.data)
	// console.log(result.data)

	useEffect(() => {
		if (result.isSuccess) {
			setBlogs(result.data)
		}
	}, [result.data])

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
			setNotification(message, 'ERROR')
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
		newBlogMutation.mutate(blogObject)
		// try {
		// 	// const response = await blogService.create(blogObject)
		// 	// const newBlog = response.data
		// 	// const updatedBlogs = await blogService.getAll()
		// 	// setBlogs(updatedBlogs)
		// 	// setNotification(
		// 	// 	`a new blog ${blogObject.title}! By ${blogObject.author} added!`,
		// 	// 	'SUCCESS'
		// 	// )
		// } catch (error) {

		// 	// const message = error.response.data.error
		// 	// setNotification(message, 'ERROR')
		// }
	}

	const addLike = async (blogObject) => {
		const user = blogObject.user.id
		const { author, title, url, likes } = blogObject
		const updatedLikes = likes + 1
		const blogToUpdate = { user, likes: updatedLikes, author, title, url }
		const id = blogObject.id

		try {
			const response = await blogService.update(blogToUpdate, id)
			const updatedBlog = response.data
			const updatedBlogs = await blogService.getAll()
			setBlogs(updatedBlogs)

			setNotification(
				`LIKE ADDED TO ${updatedBlog.title}! By ${updatedBlog.author} ADDED!`,
				'SUCCESS'
			)
		} catch (error) {
			const message = error.response.data.error
			setNotification(message, 'ERROR')
		}
	}

	const deleteBlog = async (blogObject) => {
		if (
			window.confirm(
				`Do you really want to delete ${blogObject.title} by ${blogObject.author}?`
			)
		) {
			const { id } = blogObject
			try {
				await blogService.remove(id)
				const updatedBlogs = await blogService.getAll()
				setBlogs(updatedBlogs)

				setNotification(
					`${blogObject.title} by ${blogObject.author} DELETED!`,
					'SUCCESS'
				)
			} catch (error) {
				const message = error.response.data.error
				setNotification(message, 'ERROR')
			}
		}
	}

	const loginForm = () => (
		<form id='login-form' onSubmit={handleLogin}>
			<div>
				username
				<input
					id='username'
					type='text'
					value={username}
					name='Username'
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					id='password'
					type='password'
					value={password}
					name='Password'
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id='login-button' type='submit'>
				log in
			</button>
		</form>
	)

	return (
		<div>
			<h1>Blog list</h1>

			{/* <Notification notification={notification} /> */}
			<Notification />

			{user === null ? (
				loginForm()
			) : (
				<>
					<p>
						{user.name} logged in{' '}
						<button id='logout-button' onClick={handleLogout}>
							Logout
						</button>
					</p>
					<Togglable buttonLabel='add new blog!' ref={blogFormRef}>
						<BlogForm createBlog={addBlog} />
					</Togglable>
					<h2>Blogs</h2>
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								addLike={addLike}
								deleteBlog={deleteBlog}
								username={user.username}
							/>
						))}
				</>
			)}

			<Footer />
		</div>
	)
}

export default App
