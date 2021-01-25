import React, {Component} from 'react'
import {PlaidLink} from 'react-plaid-link'
import {connect} from 'react-redux'
import {fetchBank} from '../store/bank'
import axios from 'axios'

class Link extends Component {
  constructor() {
    super()
    this.handleOnExit = this.handleOnExit.bind(this)
    this.handleOnSuccess = this.handleOnSuccess.bind(this)
    this.sync = this.sync.bind(this)
  }

  handleOnExit(event) {
    console.log('exit event -->', event)
  }

  async handleOnSuccess(token, metadata) {
    await axios.post('/api/plaid/get_access_token', {
      token
    })
  }

  async sync() {
    try {
      const {data: {accounts, transactions}} = await axios.get(
        '/api/plaid/transactions'
      )

      await axios.put('/api/users/sync', {
        accounts,
        transactions
      })
      this.props.fetchBank()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {linkToken} = this.props

    return (
      <div>
        <PlaidLink
          clientName="Stackathon"
          token={linkToken}
          onExit={this.handleOnExit}
          onSuccess={(token, metadata) => this.handleOnSuccess(token, metadata)}
        >
          Open Link and connect your bank!
        </PlaidLink>
        <div>
          <button type="button" onClick={this.sync}>
            Sync Account
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  fetchBank: () => dispatch(fetchBank())
})

export default connect(null, mapDispatch)(Link)
