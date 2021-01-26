import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Link from './Link'
import Accounts from './Accounts'
import Transactions from './Transactions'
import Graphs from './Graphs'
import {fetchLinkToken} from '../store/linkToken'
import {fetchBank, filterTransactions} from '../store/bank'

import '../style/UserHome.css'

class UserHome extends Component {
  componentDidMount() {
    this.props.fetchLinkToken()
    this.props.fetchBank()
  }

  render() {
    const {user, linkToken} = this.props

    return (
      <div className="user-home-container flex">
        <div className="user-home-header">
          <p>
            <strong>Welcome, {user.email}</strong>
          </p>
          {linkToken.length && <Link linkToken={linkToken} />}
        </div>
        <div className="user-home-content">
          <Accounts handleFilter={this.props.filter} />
          <Transactions handleFilter={this.props.filter} />
          <Graphs />
        </div>
      </div>
    )
  }
}

const mapState = ({user, linkToken}) => {
  return {
    user,
    linkToken
  }
}

const mapDispatch = dispatch => ({
  fetchLinkToken: () => dispatch(fetchLinkToken()),
  fetchBank: () => dispatch(fetchBank()),
  filter: accountId => dispatch(filterTransactions(accountId))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
