import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
	const [blogVisible, setBlogVisible] = useState(false)

	const hideWhenVisible = { display: blogVisible ? 'none' : '' }
	const showWhenVisible = { display: blogVisible ? '' : 'none' }

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
			<div style={hideWhenVisible}>
				<p>
					{blog.title} by {blog.author}{' '}
					<button onClick={toggleBlogVisibility}>view</button>
				</p>
			</div>
			<div style={showWhenVisible}>
				<p>
					{blog.title} by {blog.author}{' '}
					<button onClick={toggleBlogVisibility}>hide</button>
				</p>
				<p>{blog.url}</p>
				likes {blog.likes} <button onClick={() => addLike(blog)}>like</button>
				<p>{blog.user.username}</p>
				<button onClick={() => deleteBlog(blog)}>Delete</button>
			</div>
		</div>
	)
}

export default Blog
