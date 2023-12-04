const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');

const { User, ReadingList } = require('../models');
0;
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

router.post('/', async (req, res, next) => {
	// console.log(req.body);

	try {
		const readingList = await ReadingList.create(req.body);
		res.json(readingList);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', tokenExtractor, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.decodedToken.id);
		const reading_list = await ReadingList.findByPk(req.params.id);
		if (user.id === reading_list.userId) {
			if (req.body.read === true) {
				reading_list.read = true;
				await reading_list.save();
				res.json(`${req.params.id} reading_list state changed to true`);
			} else {
				res.json(
					`$Cannot change reading state of ${req.params.id} reading_list, pass the object { "read": true } to do that`
				);
			}
		} else {
			res.json(`Cannot delete, you are not the creator!`);
		}
		// res.json(readingList);
	} catch (error) {
		next(error);
	}
});

router.get('/all', async (req, res) => {
	const readings = await ReadingList.findAll({});

	res.json(readings);
});

module.exports = router;
