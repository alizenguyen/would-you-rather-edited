import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router";
import { saveAuthedUser } from '../actions/authedUser'
import '../css/UserChoice.css'
import Particles from 'react-particles-js'
import logo from '../images/wyr_logo-01.png'
import world from '../images/world-01.png'

class UserChoice extends Component {
  state = {
    users: {},
    selectUser: null,
    redirectToNewPage: false,
    userID: ''
  }

  //WILL SAVE SELECTED USER TO DATABASE
  saveUserChoice = (e, user) => {
    e.preventDefault();

    this.props.selectedUser(user)
      .then (() => this.setState({ userID: user.id }))
      .then (() => this.setState({ redirectToNewPage: true }))
  }

  render () {
    const { users } = this.props
    const { redirectToNewPage, userID } = this.state

    if (redirectToNewPage) {
      return (
        <Redirect to={"/home/" + userID}/>
      )
    }
    
    return (
      <div>
        <Particles 
          params={{
            particles: {
              number: {
                value: 80,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: "#41ead4"
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000"
                },
                polygon: {
                  nb_sides: 5
                },
                image: {
                  src: "img/github.svg",
                  width: 100,
                  height: 100
                }
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#41ead4",
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            retina_detect: true
          }}
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
        <div className="info-box">
          <img className="logo-image" alt="logo" src={logo} />
          <p className="tagline">Ask questions. Get answers. Earn points.</p>
          <img className="world-image" alt="world" src={world} />
          <h3 className="signin-text">Please sign in to continue.</h3>
          <div className="dropdown">
            <button className="user-button dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              SELECT USER
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {Object.keys(users).map(user => (
                  <li 
                    className="user-dropdown" 
                    key={users[user].id}
                    //EVENT HANDLER TO SAVE USER
                    onClick={(e) => this.saveUserChoice(e, users[user], users[user].id)}>
                    <img className="menu-avatar" alt="avatar" src={users[user].avatarURL} /> 
                    <a className='menu-name'> 
                      {users[user].name}
                    </a>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

//GRABS THE USERS AS A PROP
const mapStateToProps = state => {

  return {
    users: state.users,
  }
}

//GRABS THE loadingUser() and saveAuthedUser FUNCTION FROM ACTIONS TO BE ABLE TO USE IN THIS COMPONENT
const mapDispatchToProps = dispatch => {
  return {
    selectedUser: (user) => dispatch(saveAuthedUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChoice);