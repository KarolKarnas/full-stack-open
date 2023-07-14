import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Blogs from './components/Blogs'
import Navigation from './components/Navigation'
import UserPage from './pages/UserPage'
import BlogPage from './pages/BlogPage'

import { useState, useEffect, useRef, useContext } from 'react'
import NotificationContext from './components/NotificationContext'

import UserContext from './components/UserContext'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import Footer from './components/Footer'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import Users from './components/Users'

import blogService from './services/blogs'
import loginService from './services/login'

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

	// const result = useQuery(['blogs'], blogService.getAll)
	// const blogs = result.data

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

	const loginForm = () => (
		<div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
			<form id='login-form' onSubmit={handleLogin}>
				<div>
					username
					<input
						id='username'
						className='w-full pr-40 bg-gray-200 input input-sm text-black'
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
						className='w-full pr-40 bg-gray-200 input input-sm text-black'
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button
					id='login-button'
					type='submit'
					className='w-36 btn btn-lg bg-gray-300'
				>
					log in
				</button>
			</form>
		</div>
	)

	// if (result.isLoading) {
	// 	return <div>loading data...</div>
	// }

	return (
		<Router>
			<div className='flex flex-col justify-between h-screen'>
				{/* <h1 className='text-3xl font-bold'>Blog list</h1> */}
				<Navigation />
				<Notification />
				<main className='container mx-auto px-3 pb-12 flex-grow'>
					{userState === null || userState.isAuth === false ? (
						loginForm()
					) : (
						<>
							<p>
								<strong>{userState.name}</strong> logged in{' '}
								<button id='logout-button' onClick={handleLogout} className='w-36 btn btn-sm bg-gray-300'>
									Logout
								</button>
							</p>
							<Togglable buttonLabel='add new blog!' ref={blogFormRef}>
								<BlogForm createBlog={addBlog} />
							</Togglable>
							<Routes>
								<Route path='/' element={<Home />}></Route>
								<Route path='/users' element={<Users />} />
								<Route path='/blogs' element={<Blogs />} />
								<Route path='/users/:id' element={<UserPage />} />
								<Route path='/blogs/:id' element={<BlogPage />} />
							</Routes>
						</>
					)}
				</main>
				<Footer />
			</div>
		</Router>
	)
}

export default App
