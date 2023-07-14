import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
// import Comments from '../components/Comments'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from '../components/NotificationContext'
import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'

const BlogPage = () => {
	const params = useParams()
	const queryClient = useQueryClient()
	const commentInput = useRef(null)

	const { isSuccess, isLoading, data } = useQuery(['blogs'], blogService.getAll)
	// const usersData = useQuery(['users'], userService.getAll)
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

	const addCommentMutation = useMutation(blogService.comment, {
		onSuccess: (res) => {
			const text = res.data.text
			queryClient.invalidateQueries('blogs')
			setNotification(`Comment '${text}' added! Thank you!`, 'SUCCESS')
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

	const addComment = (e) => {
		e.preventDefault()
		const text = commentInput.current.value
		const comment = {
			text: text,
			blogId: params.id,
		}
		addCommentMutation.mutate(comment)
	}

	if (isLoading) {
		return <div>Loading Blog...</div>
	}
	if (isSuccess) {
		const blog = data.find((blog) => blog.id === params.id)

		return (
			<>
				<h2 className='text-2xl font-bold font-serif'>{blog.title} </h2>
				<p>
					<a
						className='p-1 hover:bg-cyan-200 hover:text-cyan-700'
						href={blog.url}
					>
						{blog.url}
					</a>
				</p>

				<p className='likes p-1'>
					Likes: <strong>{blog.likes}</strong>
					<button
						id='likeBtn'
						className='w-36 btn bg-gray-300 btn-sm ml-2'
						onClick={() => addLike(blog)}
					>
						like
					</button>
				</p>

				<p className='p-1'>
					Added by{' '}
					<Link  to={`/users/${blog.user.id}`}>
						<strong className='p-1 hover:bg-cyan-200 hover:text-cyan-700' >{blog.user.username}</strong>
					</Link>
				</p>

				{/* <Comments /> */}
				<div className='divider'></div>
				<h2 className='text-2xl font-bold font-serif mt-2'>Comments</h2>

				<ul className='list-disc italic pl-5'>
					{blog.comments.map((comment) => (
						<li key={comment.id}>{comment.text}</li>
					))}
				</ul>
				<div className='divider'>Add your comment!</div>
				<form onSubmit={addComment} className='flex flex-col'>
					<textarea
						className='bg-gray-200 text-black mb-2 rounded-md w-80'
						type='text'
						ref={commentInput}
						rows={5}
					/>
					<button className='w-36 btn bg-gray-300 btn-sm' type='submit'>add comment</button>
				</form>
			</>
		)
	}
}

export default BlogPage
