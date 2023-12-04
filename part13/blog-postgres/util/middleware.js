const { Blog, User, ActiveSession } = require('../models');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');

const tokenExtractor = async (req, res, next) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		try {
			// console.log(authorization.substring(7));
			const isActive = await ActiveSession.findOne({
				where: {
					token: authorization.substring(7),
				},
			});
			if (isActive) {
				const decodedToken = jwt.verify(authorization.substring(7), SECRET);
				console.log(decodedToken);
				const user = await User.findByPk(decodedToken.id);
				console.log(user.toJSON());

				if (!(user && user.disabled)) {
					req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
				} else {
					return res
						.status(401)
						.json({ error: 'Action cannot be performed, you are disabled!' });
				}
			} else {
				return res.status(401).json({ error: 'you are not active' });
			}
		} catch {
			return res.status(401).json({ error: 'token invalid' });
		}
	} else {
		return res.status(401).json({ error: 'token missing' });
	}
	next();
};

module.exports = { tokenExtractor };
