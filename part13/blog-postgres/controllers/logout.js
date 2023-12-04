
const router = require('express').Router();

const { Op } = require('sequelize');

const { Blog, User, ActiveSession } = require('../models');

const { tokenExtractor } = require('../util/middleware');

router.delete('/', tokenExtractor, async (req, res, next) => {
	try {
		const user = await User.findByPk(req.decodedToken.id);
		if (user) {
			await ActiveSession.destroy({
				where: {
					[Op.or]: {
						userId: user.id,
					},
				},
			});
			res.json(`${user.username} has been logout`);
		} else {
			res.json(`wrong token, you are not logged in`);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
