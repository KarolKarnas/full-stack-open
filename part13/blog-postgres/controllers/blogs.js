const jwt = require('jsonwebtoken')
const router = require('express').Router();
const { SECRET } = require('../util/config');

const { Blog, User } = require('../models');

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		try {
			req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
		} catch {
			return res.status(401).json({ error: 'token invalid' });
		}
	} else {
		return res.status(401).json({ error: 'token missing' });
	}
	next();
};

router.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.findAll({
			attributes: { exclude: ['userId'] },
			include: {
				model: User,
				attributes: ['name']
			}
		});
		res.json(blogs);
	} catch (error) {
		next(error);
	}
});

router.post('/', tokenExtractor, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.decodedToken.id);
		const blog = await Blog.create({ ...req.body, userId: user.id });
		return res.json(blog);
	} catch (error) {
		next(error);
	}
});

const blogFinder = async (req, res, next) => {
	req.blog = await Blog.findByPk(req.params.id);
	next();
};

router.put('/:id', blogFinder, async (req, res, next) => {
	try {
		req.blog.likes = req.blog.likes + 1;
		await req.blog.save();
		res.json(req.blog.likes);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', blogFinder, async (req, res, next) => {
	try {
		await req.blog.destroy();
		res.json(`${req.params.id} blog deleted successfully`);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
