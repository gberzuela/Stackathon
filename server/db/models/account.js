const Sequelize = require('sequelize')
const db = require('../db')

const Account = db.define('account', {
  accountId: Sequelize.STRING,
  name: Sequelize.STRING,
  officialName: Sequelize.STRING,
  subtype: Sequelize.STRING,
  balance: Sequelize.DECIMAL
})

module.exports = Account
