const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
// const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()



app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
	logger.info(
		`Server running on port ${config.PORT}  - http://localhost:${config.PORT}`
	)
})
