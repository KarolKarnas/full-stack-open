const router = require('express').Router();
const { sequelize } = require('../util/db');

const { Blog } = require('../models');

router.get('/', async (req, res, next) => {
	try {
    const authors = await Blog.findAll({
      attributes: [
          'author',
          [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
          [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      ],
      group:'author',
      order:[['likes', 'DESC']],
  });
  res.json(authors);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
