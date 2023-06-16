import { useState } from 'react'

const Blog = ({ blog }) => {
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
				{blog.title} <button onClick={toggleBlogVisibility}>view</button>
			</div>
			<div style={showWhenVisible}>
				{blog.title} <button onClick={toggleBlogVisibility}>hide</button>
				<br />
				<a href={blog.url}>link</a> <br />
				likes {blog.likes} <button>like</button> <br />
				{blog.author}
			</div>
		</div>
	)
}

export default Blog
