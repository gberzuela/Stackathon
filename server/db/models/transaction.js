const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  accountId: Sequelize.STRING,
  name: Sequelize.STRING,
  amount: Sequelize.DECIMAL,
  category: Sequelize.ARRAY(Sequelize.STRING),
  date: Sequelize.DATE,
  pending: Sequelize.BOOLEAN
})

module.exports = Transaction
