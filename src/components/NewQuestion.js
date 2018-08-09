import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Nav from './Nav'
import { addQuestion } from '../actions/questions'
import '../css/NewQuestion.css'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    redirectToNewPage: false,
  }

  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value

    this.setState({ optionOne: optionOne });
  }

  handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value

    this.setState({ optionTwo: optionTwo });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props

    dispatch(addQuestion(optionOne, optionTwo));
    this.setState({ userID: true });
    this.setState({ redirectToNewPage: true });
  }

  render() {
    const { authedUser, authedUserAvatar, authedUserID } = this.props
    const { optionOne, optionTwo, redirectToNewPage } = this.state

    if (redirectToNewPage) {
      return (
        <Redirect to={"/home/" + authedUserID}/>
      )
    }

    if (authedUser === null) {
      return <Redirect to='/' />
    }

    return(
      <Fragment>
        <Nav avatar={authedUserAvatar}/>
        <div className="new-question-full-div">
          <h2 className='complete-question-title'>Create New Question</h2>
          <form className='new-question-body' onSubmit={this.handleSubmit}>
            <h1 className='title'> Would you rather... </h1>
            <input 
              placeholder='Enter Option One Here' 
              value={optionOne}
              className='question-option' 
              onChange={this.handleChangeOptionOne}
              />
            <h3 className='complete-question-title'> or </h3>
            <input 
              placeholder='Enter Option Two Here' 
              value={optionTwo}
              className='question-option' 
              onChange={this.handleChangeOptionTwo}
              />
            <input type='submit' className='submit-btn'/>
          </form>
        </div>
      </Fragment>
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
    authedUser: authedUser,
    authedUserAvatar: authedUserAvatar,
    authedUserID: authedUserID
  }
}

export default connect(mapStateToProps)(NewQuestion)