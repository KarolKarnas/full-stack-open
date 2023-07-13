const commentRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')


commentRouter.post('/', async (request, response) => {
	const body = request.body

 	const blog = await Blog.findById(body.blogId)

	const comment = new Comment({
		text: body.text,
		blog: blog.id,
	})

	const savedComment = await comment.save()

	blog.comments = blog.comments.concat(savedComment._id)
	await blog.save()

	response.json(savedComment)
})

module.exports = commentRouter
