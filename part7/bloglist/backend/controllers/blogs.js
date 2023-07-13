const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.populate('user', { username: 1, name: 1 })
		.populate('comments', { text: 1 })
	response.json(blogs)
})

//  get comments of the blog
blogsRouter.get('/:id/comments', async (request, response) => {
	const blog = await Blog.findById(request.params.id).populate('comments', { text: 1 })
	response.json(blog.comments)
})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const { title, author, url, likes } = request.body

	const user = request.user

	const blog = new Blog({
		title,
		author,
		url,
		likes,
		user: user.id,
	})

	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete(
	'/:id',
	middleware.userExtractor,
	async (request, response) => {
		const user = request.user
		const blog = await Blog.findById(request.params.id)
		const userId = blog.user.toString()
		if (user.id !== userId) {
			return response.status(401).json({ error: 'invalid user' })
		}
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()
	}
)

blogsRouter.put('/:id', async (request, response) => {
	const { title, author, url, likes } = request.body

	const blogUpdated = {
		title,
		author,
		url,
		likes,
	}

	await Blog.findByIdAndUpdate(request.params.id, blogUpdated, { new: true })
	response.json(blogUpdated)
})

module.exports = blogsRouter
