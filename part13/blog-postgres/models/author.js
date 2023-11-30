const { Sequelize, QueryTypes, DataTypes, Model } = require('sequelize')

const { sequelize } = require('../util/db')

class Author extends Model {}

Author.init(
	{
		author: {
			type: DataTypes.TEXT,
		},
		articles: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		likes: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'blog',
	}
);


module.exports = Blog