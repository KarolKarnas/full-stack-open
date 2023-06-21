import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, username }) => {
	const [blogVisible, setBlogVisible] = useState(false)

	const toggleBlogVisibility = () => {
		setBlogVisible(!blogVisible)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	return (
		<div className='blog' style={blogStyle}>
			<p>
				{blog.title} by {blog.author}{' '}
				<button
					id={blogVisible ? 'hide' : 'view'}
					onClick={toggleBlogVisibility}
				>
					{blogVisible ? 'hide' : 'view'}
				</button>
			</p>
			{blogVisible && (
				<>
					<p className='url'>{blog.url}</p>
					<p className='likes'>
						likes {blog.likes}{' '}
						<button id='likeBtn' onClick={() => addLike(blog)}>
							like
						</button>
					</p>
					<p>{blog.user.username}</p>

					{username === blog.user.username && (
						<button id='deleteBtn' onClick={() => deleteBlog(blog)}>Delete</button>
					)}
				</>
			)}
		</div>
	)
}

export default Blog
