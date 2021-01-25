const User = require('./user')
const Account = require('./account')
const Transaction = require('./transaction')

User.hasMany(Account)
User.hasMany(Transaction)

module.exports = {
  User,
  Account,
  Transaction
}
