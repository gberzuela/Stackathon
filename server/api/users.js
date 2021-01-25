const router = require('express').Router()
const {User, Account, Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/bank', async (req, res, next) => {
  try {
    res.send({
      accounts: await req.user.getAccounts(),
      transactions: await req.user.getTransactions()
    })
  } catch (error) {
    next(error)
  }
})

router.put('/sync', async (req, res, next) => {
  try {
    const {accounts, transactions} = req.body

    const accountRows = await Promise.all(
      accounts.map(account => {
        const {account_id, balances, name, official_name, subtype} = account
        return Account.create({
          accountId: account_id,
          name,
          officialName: official_name,
          subtype,
          balance: balances.available
        })
      })
    )

    const transactionRows = await Promise.all(
      transactions.map(transaction => {
        const {account_id, name, amount, category, date, pending} = transaction
        return Transaction.create({
          accountId: account_id,
          name,
          amount,
          category,
          date,
          pending
        })
      })
    )

    await Promise.all([
      req.user.setAccounts(accountRows),
      req.user.setTransactions(transactionRows)
    ])

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
