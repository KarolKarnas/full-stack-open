import { useState, useEffect, useRef, useContext } from 'react'
import NotificationContext from './components/NotificationContext'

import UserContext from './components/UserContext'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import Blog from './components/Blog'
import Footer from './components/Footer'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import Users from './components/Users'

import blogService from './services/blogs'
import loginService from './services/login'
// import userService from './services/users'

const App = () => {
	// const [blogs, setBlogs] = useState([])
	const { setNotification } = useContext(NotificationContext)
	const { userState, loginUser, logoutUser } = useContext(UserContext)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	// const [user, setUser] = useState(null)

	const blogFormRef = useRef()
	//REACT QUERY

	const queryClient = useQueryClient()

	const result = useQuery(['blogs'], blogService.getAll)
	const blogs = result.data

	const newBlogMutation = useMutation(blogService.create, {
		onSuccess: (res) => {
			const blogObject = res.data
			queryClient.invalidateQueries('blogs')
			setNotification(
				`a new blog ${blogObject.title}! By ${blogObject.author} added!`,
				'SUCCESS'
			)
		},
		onError: (error) => {
			setNotification(error.response.data.error, 'ERROR')
		},
	})

	const updateBlogMutation = useMutation(blogService.update, {
		onSuccess: (res) => {
			// console.log(res)
			const updatedBlog = res.data
			queryClient.invalidateQueries('blogs')
			setNotification(
				`LIKE ADDED TO ${updatedBlog.title}! By ${updatedBlog.author} ADDED!`,
				'SUCCESS'
			)
		},
		onError: (error) => {
			setNotification(error.response.data.error, 'ERROR')
		},
	})

	const removeBlogMutation = useMutation(blogService.remove, {
		onSuccess: (res) => {
			// console.log(res)
			const blogObject = res.data
			queryClient.invalidateQueries('blogs')
			setNotification(
				`${blogObject.title} by ${blogObject.author} DELETED!`,
				'SUCCESS'
			)
		},
		onError: (error) => {
			setNotification(error.response.data.error, 'ERROR')
		},
	})

	// LOGIN

	useEffect(() => {
		const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const userState = JSON.parse(loggedUserJSON)
			// console.log('user useEffect ', userState)
			loginUser(userState, 'LOGIN')
			blogService.setToken(userState.token)
			// setUser(userState)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const userState = await loginService.login({
				username,
				password,
			})
			localStorage.setItem('loggedBlogAppUser', JSON.stringify(userState))
			blogService.setToken(userState.token)
			//reducer
			loginUser(userState, 'LOGIN')
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
		localStorage.removeItem('loggedBlogAppUser', JSON.stringify(userState))
		logoutUser()
		// setUser(userState)
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

		updateBlogMutation.mutate([blogToUpdate, id])
	}

	const deleteBlog = async (blogObject) => {
		if (
			window.confirm(
				`Do you really want to delete ${blogObject.title} by ${blogObject.author}?`
			)
		) {
			const { id } = blogObject
			removeBlogMutation.mutate([id])
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

	if (result.isLoading) {
		return <div>loading data...</div>
	}

	return (
		<div>
			<h1>Blog list</h1>

			{/* <Notification notification={notification} /> */}
			<Notification />
			{userState === null || userState.isAuth === false ? (
				loginForm()
			) : (
				<>
					<p>
						{userState.name} logged in{' '}
						<button id='logout-button' onClick={handleLogout}>
							Logout
						</button>
					</p>
					<Togglable buttonLabel='add new blog!' ref={blogFormRef}>
						<BlogForm createBlog={addBlog} />
					</Togglable>
					<h2>Users</h2>
					 <Users />

					<h2>Blogs</h2>
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								addLike={addLike}
								deleteBlog={deleteBlog}
								username={userState.username}
							/>
						))}
				</>
			)}

			<Footer />
		</div>
	)
}

export default App
