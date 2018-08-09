import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../css/LeaderBoard.css'
import Nav from './Nav'
import crown from '../images/leader.png'

class LeaderBoard extends Component {

  render() {
    const { userArray, authedUser } = this.props

    if (authedUser === null) {
      return <Redirect to='/' />
    }


    return(
      <div className="leader-full-body">
        <Nav />
        <img className="crown-img" alt="crown" src={crown} /> 
        <h2 className="leader-title">LEADER BOARD</h2>
        {userArray.map(user => (
          <div key={user.id} className="leader-item">
            <div className="row"> 
              <div className="col-md-4">
                <img className="leader-avatar" alt="user-avatar" src={user.avatarURL} /> 
              </div>
              <div className="col-md-5 leader-body">
                <h3 className="leader-name">{user.name}</h3>
                <p className="result-text" style={{marginTop: '15px'}}> Answered Questions: {user.answeredResults}</p>
                <p className="result-text"> Queestions Asked:   {user.questionsResults}</p>
              </div>
              <div className="col-md-3 total-score">
                <p> Total Score: </p>
                <p>{user.ranking} </p>
              </div>
            </div>
        </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {

  const userArray = Object.keys(users).map((user) => {
    const userInfo = {
      id: users[user].id,
      avatarURL: users[user].avatarURL,
      name: users[user].name,
      answeredResults: Object.keys(users[user].answers).length,
      questionsResults: users[user].questions.length,
    }

    const ranking = userInfo.answeredResults + userInfo.questionsResults

    userInfo.ranking = ranking;

    return userInfo;
  }).sort((a,b) => (
    b.ranking - a.ranking
  ))

  console.log(userArray)
  
  return {
    authedUser,
    userArray
  }
}

export default connect(mapStateToProps)(LeaderBoard)