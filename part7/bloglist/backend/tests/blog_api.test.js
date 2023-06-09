const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''
let userId = ''

beforeAll(async () => {
	await User.deleteMany({})

	const passwordHash = await bcrypt.hash('tester', 10)

	const initialUser = new User({
		username: 'tester',
		name: 'tester',
		passwordHash,
	})

	const user = await initialUser.save()
	userId = user.id
	const response = await api.post('/api/login').send({
		username: 'tester',
		password: 'tester',
	})
	token = response.body.token
})

beforeEach(async () => {
	await Blog.deleteMany({})
	const initialBlogsUser = helper.initialBlogs.map((blog) => ({
		...blog,
		user: userId,
	}))
	await Blog.insertMany(initialBlogsUser)
})

describe('when there is initially some blogs saved', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('a specific blog is within returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const titles = response.body.map((blog) => blog.title)

		expect(titles).toContain('Go To Statement Considered Harmful')
	})

	test('unique identifier property of the blog posts is named id for each blog', async () => {
		const response = await api.get('/api/blogs')
		// response.body.forEach((blog) => expect(blog).toHaveProperty('id'))
		response.body.forEach((blog) => expect(blog.id).toBeDefined())
	})

	describe('addition of a new blog', () => {
		test('adding a blog fails with 401 Unauthorized if a token is not provided', async () => {
			const newBlog = {
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
			}

			await api.post('/api/blogs').send(newBlog).expect(401)
		})

		test('a valid blog can be added with token provided', async () => {
			const newBlog = {
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
			}

			await api
				.post('/api/blogs')
				.set('Authorization', `Bearer ${token}`)
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

			const titles = blogsAtEnd.map((blog) => blog.title)
			expect(titles).toContain('Canonical string reduction')
		})

		test('if the likes property is missing from the request, it will default to the value 0', async () => {
			const newBlog = {
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			}

			const response = await api
				.post('/api/blogs')
				.set('Authorization', `Bearer ${token}`)
				.send(newBlog)

			expect(response.body.likes).toBe(0)
		})

		test('if the title property is missing and token is provided, backend responds 400 Bad Request', async () => {
			const newBlogNoTitle = {
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
			}

			await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlogNoTitle).expect(400)
		})

		test('if the url property is missing and token is provided, backend responds 400 Bad Request', async () => {
			const newBlogNoUrl = {
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				likes: 12,
			}
			await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlogNoUrl).expect(400)
		})
	})

	describe('Blog delete', () => {
		test('when token provided, after delete given id the object do not exist in db', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const blogToDelete = blogsAtStart[0]

			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.set('Authorization', `Bearer ${token}`)
				.expect(204)

			const blogsAtEnd = await helper.blogsInDb()

			expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

			const titles = blogsAtEnd.map((blog) => blog.title)

			expect(titles).not.toContain(blogToDelete.title)
		})
	})

	describe('Blog update', () => {
		test('success update with code 200 and new number of likes', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const blogToUpdate = blogsAtStart[0]

			await api.put(`/api/blogs/${blogToUpdate.id}`).expect(200)

			const blogsAtEnd = await helper.blogsInDb()

			expect(blogsAtEnd.length).toBe(blogsAtStart.length)
			const likesArr = blogsAtEnd.map((blog) => blog.likes)

			expect(likesArr).toContain(blogToUpdate.likes)
		})
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
