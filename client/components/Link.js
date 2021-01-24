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

  handleOnExit() {
    // TBA
  }

  async handleOnSuccess(token, metadata) {
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

    return (
      <div>
        <PlaidLink
          clientName="Stackathon"
          token={linkToken}
          // onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
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
