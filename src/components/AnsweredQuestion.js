import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/AnsweredQuestion.css'

class Question extends Component {
  render() {
    const { users, authedUser, author, optionOne, optionTwo, optionOneVotes, optionTwoVotes } = this.props

    const totalLength = optionOneVotes.length + optionTwoVotes.length
    const percentOne = (optionOneVotes.length / totalLength) * 100
    const percentTwo = (optionTwoVotes.length / totalLength) * 100

    return(
      <div className="answered-full-div">
        <div>
          <img className="answered-avatar" alt="user-avatar" src={Object.values(users)[2]} /> 
        </div>
        <div className="question-form">
          {authedUser.id === author
            ? <div className="question-title">Asked by You:</div>
            : <div className="question-title">{author} asked:</div>}
          <h3> Results </h3>
          <br />
          {optionOneVotes.includes(Object.values(authedUser)[0])
          ? <div className='answered-div'>
              <div className='user-choice'>
                <div className='title-user-choice'>
                  <p className='title-content'>You chose</p>
                </div>
                <p className='paragraph-text'>Would you rather {optionOne} </p>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentOne}%`}}></div>
                </div>
                <p>{optionOneVotes.length} out of {totalLength} votes</p>
              </div>
              <br />
              <div className='not-user-choice'>
                <p className='paragraph-text'>Would you rather {optionTwo}</p>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentTwo}%`}}></div>
                </div>
                <p>{optionTwoVotes.length} out of {totalLength} votes</p>
              </div>
            </div>
          : <div className='answered-div'> 
              <div className='not-user-choice'>
                <p className='paragraph-text'>Would you rather {optionOne} </p>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentOne}%`}}></div>
                </div>
                <p>{optionOneVotes.length} out of {totalLength} votes</p>
              </div>
              <br />
              <div className='user-choice'>
                <div className='title-user-choice'>
                  <p className='title-content'>You chose</p>
                </div>
                <p className='paragraph-text'>Would you rather {optionTwo}</p>
                <div className="progress">
                  <div className="progress-bar" style={{width: `${percentTwo}%`}}></div>
                </div>
                <p>{optionTwoVotes.length} out of {totalLength} votes</p>
              </div>
            </div>
          }
        </div>  
        <div className="clearfix"></div>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }, { userID }) {
  const user = users[userID];

  return {
    users: user,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(Question)