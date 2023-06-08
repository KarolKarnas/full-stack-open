const blogsRouter = require('express').Router()
// const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const { title, author, url, likes } = request.body

	const blog = new Blog({
		title,
		author,
		url,
		likes,
	})

	const savedBlog = await blog.save()
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
