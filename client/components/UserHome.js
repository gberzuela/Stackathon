import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Link from './Link'
import Accounts from './Accounts'
import Transactions from './Transactions'
import {fetchLinkToken} from '../store/linkToken'
import {fetchBank} from '../store/bank'

class UserHome extends Component {
  componentDidMount() {
    this.props.fetchLinkToken()
    this.props.fetchBank()
  }

  render() {
    const {user, linkToken} = this.props

    return (
      <div>
        <h3>Welcome, {user.email}</h3>
        {linkToken.length && <Link linkToken={linkToken} />}
        <Accounts />
        <Transactions />
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
  fetchBank: () => dispatch(fetchBank())
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
