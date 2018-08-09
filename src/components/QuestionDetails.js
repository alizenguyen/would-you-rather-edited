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

    for (let i=0; i < unAnsweredQuestions.length; i+=1) {
      if(unAnsweredQuestions[i].id === questionID) {
        this.setState({ showUnanswered: true })
      }
    }

    for (let i=0; i < answeredQuestions.length; i+=1) {
      if(answeredQuestions[i].id === questionID) {
        this.setState({ showUnanswered: false })
      }
    }
  }

  render() {
    let { authedUser, question } = this.props
    const { showUnanswered } = this.state

    if (authedUser === null) {
      return <Redirect to='/' />
    }

    question = question[0];

    return(
      <Fragment>
        <Nav />
        <div>
          {showUnanswered === true ? 
              <Question
                key={question.id}
                questionID={question.id}
                author={question.author}
                optionOne={question.optionOne.text}
                optionTwo={question.optionTwo.text}
                userID={question.author}
                />
            : 
              <AnsweredQuestion 
                key={question.id}
                author={question.author}
                optionOne={question.optionOne.text}
                optionTwo={question.optionTwo.text}
                userID={question.author}
                optionOneVotes={question.optionOne.votes}
                optionTwoVotes={question.optionTwo.votes}
                />
          }
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps ({ users, authedUser, questions }, { match, userID }) {
  const user = users[userID];
  let unAnsweredQuestions = {}
  let answeredQuestions = {}
  let questionID = match.params.question_id


  if (authedUser !== null) {
    unAnsweredQuestions = Object.values(Object.values(questions)).filter((question) => 
      !question.optionOne.votes.includes(authedUser.id) && !question.optionTwo.votes.includes(authedUser.id)); 

    answeredQuestions = Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser.id) || question.optionTwo.votes.includes(authedUser.id));
  }

  const question = Object.values(Object.values(questions))
    .filter((question) => question.id.includes(questionID));

  return {
    question: question,
    unAnsweredQuestions: Object.values(unAnsweredQuestions),
    answeredQuestions: Object.values(answeredQuestions),
    users: user,
    authedUser: authedUser,
    questionID: questionID
  }
}

export default connect(mapStateToProps)(QuestionDetails)