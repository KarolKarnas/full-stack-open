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
				<span className='defaultVisibleTitle'>{blog.title}</span> by <span className='defaultVisibleAuthor'>{blog.author}</span>
				<button onClick={toggleBlogVisibility}>view</button>
			</div>
			<div style={showWhenVisible}>
			<span className='defaultHiddenTitle'>{blog.title}</span> by <span className='defaultHiddenAuthor'>{blog.author}</span>
					<button onClick={toggleBlogVisibility}>hide</button>
				<p className='url'>{blog.url}</p>
				<p className='likes'>likes {blog.likes} <button onClick={() => addLike(blog)}>like</button></p>
				<p>{blog.user.username}</p>
				<button onClick={() => deleteBlog(blog)}>Delete</button>
			</div>
		</div>
	)
}

export default Blog
