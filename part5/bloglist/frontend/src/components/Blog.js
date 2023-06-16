import { useState } from 'react'

const Blog = ({ blog, addLike }) => {
	const [blogVisible, setBlogVisible] = useState(true)

	const hideWhenVisible = { display: blogVisible ? 'none' : '' }
	const showWhenVisible = { display: blogVisible ? '' : 'none' }

	const toggleBlogVisibility = () => {
		setBlogVisible(!blogVisible)
	}

  // const addLike = (blog) => {
  //   console.log(blog)
  // }

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
				<p>{blog.title} by {blog.author} <button onClick={toggleBlogVisibility}>view</button></p>
			
			</div>
			<div style={showWhenVisible}>
				<p>{blog.title} by {blog.author} <button onClick={toggleBlogVisibility}>hide</button></p>
				<p><a href={blog.url}>link</a></p>
				likes {blog.likes} <button onClick={() => addLike({blog})}>like</button>
        <p>{blog.user.username}</p>
			</div>
		</div>
	)
}

export default Blog
