const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
// const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

// app.get('/api/blogs', (request, response) => {
// 	logger.info(Blog)
// 	Blog.find({}).then((blogs) => {
// 		response.json(blogs)
// 	})
// })

// app.post('/api/blogs', (request, response) => {
// 	const blog = new Blog(request.body)

// 	blog.save().then((result) => {
// 		response.status(201).json(result)
// 	})
// })

app.listen(config.PORT, () => {
	logger.info(
		`Server running on port ${config.PORT}  - http://localhost:${config.PORT}`
	)
})
