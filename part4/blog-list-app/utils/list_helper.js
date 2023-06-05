const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const addLike = (sum, blog) => {
		return sum + blog.likes
	}

	return blogs.reduce(addLike, 0)
}

module.exports = {
	dummy,
	totalLikes,
}
