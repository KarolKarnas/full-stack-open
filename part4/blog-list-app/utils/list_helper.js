// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const addLike = (sum, blog) => {
		return sum + blog.likes
	}

	return blogs.reduce(addLike, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return 'there is no favorite blog here'
	} else {
		const { title, author, likes } = blogs.reduce((prev, curr) =>
			curr.likes > prev.likes ? curr : prev
		)

		return {
			title,
			author,
			likes,
		}
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
}
