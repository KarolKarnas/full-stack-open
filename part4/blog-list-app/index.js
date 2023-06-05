const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
// const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

const app = express()

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
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

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(config.PORT, () => {
	logger.info(
		`Server running on port ${config.PORT}  - http://localhost:${config.PORT}`
	)
})
