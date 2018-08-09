import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { saveAuthedUser } from '../actions/authedUser'
import '../css/Nav.css'
import logo from '../images/wyr_logo-01.png'

class Nav extends Component {
  handleLogOut = (e) => {
    this.props.selectedUser(null)
  }

  render() {
    const { authedUserID, authedUserAvatar } = this.props

    return (
    <div className='full-nav'>
      <img className='nav-logo' alt='logo' src={logo} />
      <nav className='nav'>
        <ul>
          <Link to={'/home/' + authedUserID} className='nav-item'>
            HOME
          </Link>
          <Link to={'/add'} className='nav-item'> 
            NEW QUESTION
          </Link>
          <Link to={'/leaderboard'} className='nav-item'>
            LEADER BOARD
          </Link>
          <Link to={'/'} className='nav-item' id='left-nav' onClick={this.handleLogOut}>
            <img className="nav-avatar" alt="user-avatar" src={authedUserAvatar} />
            LOGOUT
          </Link>
        </ul>
      </nav>
      <div className="clearfix"></div>
    </div>
  )
  }
}

function mapStateToProps ({ authedUser }) {
  let authedUserAvatar = ''
  let authedUserID = ''

  if (authedUser !== null) {
    authedUserAvatar = authedUser.avatarURL;
    authedUserID = authedUser.id
  }

  return {
    authedUserAvatar: authedUserAvatar,
    authedUserID: authedUserID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectedUser: (user) => dispatch(saveAuthedUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)