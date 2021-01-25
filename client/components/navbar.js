import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'

import '../style/navbar.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar-container flex">
    <h1>Stackathon</h1>
    {isLoggedIn ? (
      <div className="navbar-routes flex">
        <Link to="/home">
          <HomeOutlinedIcon />
        </Link>
        <a href="#" onClick={handleClick}>
          <ExitToAppOutlinedIcon />
        </a>
      </div>
    ) : (
      <div className="navbar-routes flex">
        <Link to="/login">
          <LockOpenOutlinedIcon />
        </Link>
        <Link to="/signup">
          <PersonAddOutlinedIcon />
        </Link>
      </div>
    )}
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
