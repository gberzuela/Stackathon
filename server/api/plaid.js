const router = require('express').Router()
const plaid = require('plaid')
const moment = require('moment')
const {User} = require('../db')
module.exports = router

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments[process.env.PLAID_ENV]
})

let ACCESS_TOKEN = null
let PUBLIC_TOKEN = null
let ITEM_ID = null

router.post('/create_link_token', async (req, res, next) => {
  try {
    // Get client user id
    const user = req.user
    const client_user_id = user.id.toString()

    // Create link-token
    const tokenResponse = await client.createLinkToken({
      user: {
        client_user_id
      },
      client_name: 'Stackathon',
      products: ['transactions', 'auth'],
      country_codes: ['US'],
      language: 'en'
    })

    res.send(tokenResponse.link_token)
  } catch (error) {
    next(error)
  }
})

router.post('/get_access_token', async (req, res, next) => {
  try {
    PUBLIC_TOKEN = req.body.token
    const response = await client.exchangePublicToken(PUBLIC_TOKEN)
    await req.user.update({accessToken: response.access_token})
    ACCESS_TOKEN = response.access_token
    ITEM_ID = response.item_id
    res.send({ACCESS_TOKEN, ITEM_ID})
  } catch (error) {
    next(error)
  }
})

router.get('/transactions', async (req, res, next) => {
  try {
    const result = await client.getTransactions(
      req.user.accessToken,
      moment()
        .startOf('month')
        .format('YYYY-MM-DD'),
      moment().format('YYYY-MM-DD'),
      {
        count: 250,
        offset: 0
      }
    )
    res.send(result)
  } catch (error) {
    next(error)
  }
})
