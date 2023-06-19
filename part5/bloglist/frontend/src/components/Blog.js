import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
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
		<div style={blogStyle}>
			<p>
				{blog.title} by {blog.author}{' '}
				<button onClick={toggleBlogVisibility}>
					{blogVisible ? 'hide' : 'view'}
				</button>
			</p>
			{blogVisible && (
				<>
					<p className='url'>{blog.url}</p>
					<p className='likes'>
						likes {blog.likes}{' '}
						<button onClick={() => addLike(blog)}>like</button>
					</p>
					<p>{blog.user.username}</p>
					<button onClick={() => deleteBlog(blog)}>Delete</button>
				</>
			)}
		</div>
	)
}

export default Blog
