const mongoose = require('mongoose')
const config = require('./utils/config')

const url = config.MONGO_JS_TEST

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
	title: 'Go To Statement Considered Harmful',
	author: 'Edsger W. Dijkstra',
	url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	likes: 5,
})

// eslint-disable-next-line no-unused-vars
blog.save().then((result) => {
	console.log('note saved!')
	mongoose.connection.close()
})

Blog.find({}).then((result) => {
	result.forEach((note) => {
		console.log(note)
	})
	mongoose.connection.close()
})
