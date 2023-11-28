const router = require('express').Router();

const { Blog } = require('../models');

router.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.findAll();
		res.json(blogs);
	} catch (error) {
	next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const blog = await Blog.create(req.body);
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
