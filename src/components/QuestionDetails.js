import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import Question from './Question'
import AnsweredQuestion from './AnsweredQuestion'
import { Redirect } from "react-router";

class QuestionDetails extends Component {
  state = {
    showUnanswered: null,
  }

  componentDidMount () {
    const { unAnsweredQuestions, answeredQuestions, questionID } = this.props
    console.log(questionID)

    for (let i=0; i < unAnsweredQuestions.length; i+=1) {
      console.log(unAnsweredQuestions[i].id)
      if(unAnsweredQuestions[i].id === questionID) {
        this.setState({ showUnanswered: true })
      }
    }

    for (let i=0; i < answeredQuestions.length; i+=1) {
      console.log(answeredQuestions[i].id)
      if(answeredQuestions[i].id === questionID) {
        this.setState({ showUnanswered: false })
      }
    }
  }

  render() {
    const { authedUser } = this.props
    const { showUnanswered } = this.state

    if (authedUser === null) {
      return <Redirect to='/' />
    }

    console.log(showUnanswered)

    return(
      <Fragment>
        <Nav />
        <div className="question-full-div">
          Testing
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps ({ users, authedUser, questions }, { match, userID }) {
  const user = users[userID];

  let unAnsweredQuestions = {}

  let answeredQuestions = {}

  if (authedUser !== null) {
    unAnsweredQuestions = Object.values(Object.values(questions)).filter((question) => 
      !question.optionOne.votes.includes(authedUser.id) && !question.optionTwo.votes.includes(authedUser.id)); 

    answeredQuestions = Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser.id) || question.optionTwo.votes.includes(authedUser.id));
  }

  return {
    unAnsweredQuestions: Object.values(unAnsweredQuestions),
    answeredQuestions: Object.values(answeredQuestions),
    users: user,
    authedUser: authedUser,
    questionID: match.params.question_id
  }
}

export default connect(mapStateToProps)(QuestionDetails)