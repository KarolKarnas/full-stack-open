const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	logger.info(Blog)
	Blog.find({}).then((blogs) => {
		response.json(blogs)
	})
})

blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)
	blog.save().then((result) => {
		response.status(201).json(result)
	})
})

module.exports = blogsRouter