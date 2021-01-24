import React, {Component} from 'react'
import {PlaidLink} from 'react-plaid-link'
import axios from 'axios'

class Link extends Component {
  constructor() {
    super()
    this.state = {
      transactions: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleOnExit(event) {
    console.log('exit event -->', event)
  }

  async handleOnSuccess(token, metadata) {
    console.log('got to success')
    const {data} = await axios.post('/api/plaid/get_access_token', {
      token
    })
  }

  async handleClick() {
    const {data} = await axios.get('/api/plaid/accounts')
    console.log(data)
  }

  render() {
    const {linkToken} = this.props
    console.log('linkToken for PlaidLink -->', linkToken)

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
          <button type="button" onClick={this.handleClick}>
            Get Accounts
          </button>
        </div>
      </div>
    )
  }
}

export default Link
