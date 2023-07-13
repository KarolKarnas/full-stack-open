import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
// import Comments from '../components/Comments'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from '../components/NotificationContext'
import { useContext } from 'react'


const BlogPage = () => {
	const params = useParams()
	const queryClient = useQueryClient()

	const { isSuccess, isLoading, data } = useQuery(['blogs'], blogService.getAll)
	const { setNotification } = useContext(NotificationContext)

	const updateBlogMutation = useMutation(blogService.update, {
		onSuccess: (res) => {
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

	const addLike = async (blogObject) => {
		const user = blogObject.user.id
		const { author, title, url, likes } = blogObject
		const updatedLikes = likes + 1
		const blogToUpdate = { user, likes: updatedLikes, author, title, url }
		const id = blogObject.id

		updateBlogMutation.mutate([blogToUpdate, id])
	}

	if (isLoading) {
		return <div>Loading Blog...</div>
	}
	if (isSuccess) {
		const blog = data.find((blog) => blog.id === params.id)
		console.log(blog)
		return (
			<>
				<h2>{blog.title} </h2>
				<p>
					<a href={blog.url}>{blog.url}</a>
				</p>

				<p className='likes'>
					likes {blog.likes}{' '}
					<button id='likeBtn' onClick={() => addLike(blog)}>
						like
					</button>
				</p>
				<p>added by {blog.user.username}</p>
				{/* <Comments /> */}
				<h2>Comments</h2>
				<ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
			</>
		)
	}
}
export default BlogPage
