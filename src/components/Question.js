import React, { Component } from 'react'
import { connect } from 'react-redux'
import { savingQuestionAnswer } from '../actions/questions'
import { Redirect } from "react-router";
import '../css/Question.css'

class Question extends Component {
  state = {
    answer: '',
    answered: false,
  }

  handleChange = (e) => {
    const answer = e.target.value

    this.setState({ answer: answer })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();

    const { answer } = this.state
    const { dispatch, questionID } = this.props
    
    if (!answer) {
      alert('Please select an answer.')
    } else {
      dispatch(savingQuestionAnswer(questionID, answer));
      this.setState({ answered: true })
    }
  }

  render() {
    const { users, authedUser } = this.props
    const { answered } = this.state

    if (answered) {
      return (
        <Redirect to={"/home/" + authedUser.id}/>
      )
    }

    return(
      <div className="question-full-div">
        <div>
          <img className="question-avatar" alt="user-avatar" src={Object.values(users)[2]} /> 
        </div>
        <form className="question-form" onSubmit={this.handleSubmit}>
          {authedUser.id === this.props.author
            ? <div className="question-title">You asked:</div>
            : <div className="question-title">{this.props.author} asks:</div>}
          <h3> Would you rather... </h3>
          <input type='radio' name='option' value='optionOne' id='optionOne' onChange={this.handleChange}/>
          <label className="question-choice" htmlFor='optionOne'> {this.props.optionOne} </label>
          <br />
          <input type='radio' name='option' value='optionTwo' id='optionTwo' onChange={this.handleChange}/> 
          <label className="question-choice" htmlFor='optionTwo'>{this.props.optionTwo}</label>
          <br />
          <input className="question-button" type='submit' />
        </form>  
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