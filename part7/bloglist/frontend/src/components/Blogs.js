import blogService from '../services/blogs'
import Blog from './Blog'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import UserContext from './UserContext'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'


const Blogs = () => {
	const queryClient = useQueryClient()
	const { isSuccess, isLoading, data } = useQuery(['blogs'], blogService.getAll)

  const { setNotification } = useContext(NotificationContext)
	const { userState } = useContext(UserContext)

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

	if (isLoading) {
		return <div>Loading Blogs...</div>
	}
	if (isSuccess) {
		return (
			<>
				<h2>Blogs</h2>
				{data
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
		)
	}
}

export default Blogs
