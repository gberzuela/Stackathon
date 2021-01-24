import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Link from './Link'
import {fetchLinkToken} from '../store/linkToken'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    this.props.fetchLinkToken()
  }

  render() {
    const {user, linkToken} = this.props

    return (
      <div>
        <h3>Welcome, {user.email}</h3>
        {linkToken.length && <Link linkToken={linkToken} />}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({user, linkToken}) => {
  return {
    user,
    linkToken
  }
}

const mapDispatch = dispatch => ({
  fetchLinkToken: () => dispatch(fetchLinkToken())
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
