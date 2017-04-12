const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const chalk = require('chalk')

const Users = sequelize.define('users', {
	Name: {
		type: Sequelize.STRING(60),
	},
	email: {
		type: Sequelize.STRING(80),
    // unique: true,
		notNull: true,
		isEmail: true
	},
	password: {
		type: Sequelize.STRING,
	},
	{
		timestamps: true,
		underscored: true

	}
)

Users.belongsTo(Houses)

Users.sync()
console.log(chalk.cyan('+++line 52 this is users table in users model: ', Users))

module.exports = Users
