const User = require('./user')
const Account = require('./account')
const Transaction = require('./transaction')

User.hasMany(Account)

Account.belongsToMany(Transaction, {through: 'Bank'})
Transaction.belongsToMany(Account, {through: 'Bank'})

module.exports = {
  User,
  Account,
  Transaction
}
