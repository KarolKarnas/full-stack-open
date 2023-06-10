const blogsRouter = require('express').Router()
// const logger = require('../utils/logger')
const User = require('../models/user')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const { title, author, url, likes, userId } = request.body

	let user
	if (!userId) {
		user = await User.findOne()
	} else {
		user = await User.findById(userId)
	}

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

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

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
