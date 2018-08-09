import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router";
import '../css/QuestionInitial.css'

class QuestionInitial extends Component {
  state = {
    showQuestionDetail: false,
  }

  renderQuestion = (e) => {
    this.setState(
      {showQuestionDetail: true}
    )
  }
  
  render() {
    const { users, authedUser, questionID } = this.props
    const { showQuestionDetail } = this.state

    if (showQuestionDetail === true) {
      return <Redirect to={'/question/' + questionID}/>
    }

    return(
    <div className="question-full-div">
        <div>
          <img className="question-avatar" alt="user-avatar" src={Object.values(users)[2]} /> 
        </div>
        <div className="question-form">
          {authedUser.id === this.props.author
            ? <div className="question-title">You asked:</div>
            : <div className="question-title">{this.props.author} asks:</div>}
          <h3> Would you rather... </h3>
          <p className="question-teaser"> {this.props.optionOne} or ... </p>
          <button className="question-button" onClick={(e) => this.renderQuestion(e)}> View Details </button>
        </div>
        <div className="clearfix"></div>
    </div>
    )
  }
}

function mapStateToProps ({ users, authedUser, questions }, { userID }) {
  const user = users[userID];
  
  return {
    users: user,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(QuestionInitial)