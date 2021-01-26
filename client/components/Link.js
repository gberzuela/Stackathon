import React, {Component} from 'react'
import {PlaidLink} from 'react-plaid-link'
import {connect} from 'react-redux'
import {fetchBank} from '../store/bank'
import {me} from '../store/user'
import axios from 'axios'

class Link extends Component {
  constructor() {
    super()
    this.state = {
      plaidLinked: false
    }
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
    this.setState({plaidLinked: true})
    this.props.getMe()
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
    const {linkToken, user: {accessToken}} = this.props
    const {plaidLinked} = this.state

    return (
      <div>
        <PlaidLink
          clientName="Stackathon"
          token={linkToken}
          onExit={this.handleOnExit}
          onSuccess={(token, metadata) => this.handleOnSuccess(token, metadata)}
        >
          Open Link to Plaid!
        </PlaidLink>
        <div>
          {accessToken && (
            <button type="button" onClick={this.sync}>
              Sync Account
            </button>
          )}
        </div>
      </div>
    )
  }
}

const mapState = ({user}) => ({user})

const mapDispatch = dispatch => ({
  fetchBank: () => dispatch(fetchBank()),
  getMe: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Link)
