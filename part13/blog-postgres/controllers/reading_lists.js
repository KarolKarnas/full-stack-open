const router = require('express').Router();

const { ReadingList } = require('../models');

router.post('/', async (req, res, next) => {
	// console.log(req.body);

	try {
		const readingList = await ReadingList.create(req.body);
		res.json(readingList);
	} catch (error) {
		next(error);
	}
});

router.get('/all', async (req, res) => {
	const readings = await ReadingList.findAll({});

	res.json(readings);
});

module.exports = router;
