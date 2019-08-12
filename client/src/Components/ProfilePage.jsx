import React from 'react';
import ProfileFirstName from './ProfileFirstName.jsx';
import ProfileLastName from './ProfileLastName.jsx';
import ProfileEmail from './ProfileEmail.jsx';
import { Typography, Grid } from '@material-ui/core';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'chad@chad.chad',
      emailIsHidden: true,
      firstName: 'Chad',
      firstNameIsHidden: true,
      lastName: 'CHAD',
      lastNameIsHidden: true,
      input: ''
    };

    this.emailButtonHandler = this.emailButtonHandler.bind(this);
    this.firstNameButtonHandler = this.firstNameButtonHandler.bind(this);
    this.lastNameButtonHandler = this.lastNameButtonHandler.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFirstNameSubmit = this.handleFirstNameSubmit.bind(this);
    this.handleLastNameSubmit = this.handleLastNameSubmit.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
  }

  emailButtonHandler(e) {
    this.setState({
      emailIsHidden: !this.state.emailIsHidden
    });
  }
  firstNameButtonHandler(e) {
    this.setState({
      firstNameIsHidden: !this.state.firstNameIsHidden
    });
  }
  lastNameButtonHandler(e) {
    this.setState({
      lastNameIsHidden: !this.state.lastNameIsHidden
    });
  }

  handleInput(e) {
    let input = e.target.value;
    this.setState({ input });
  }

  handleFirstNameSubmit(e) {
    //send input to updatedatabase
    console.log(this.state.input);
    this.setState({
      firstNameIsHidden: !this.state.firstNameIsHidden
    });
  }

  handleLastNameSubmit(e) {
    //send input to updatedatabase
    this.setState({
      lastNameIsHidden: !this.state.lastNameIsHidden
    });
    console.log(this.state.input);
  }

  handleEmailSubmit(e) {
    //send input to updatedatabase
    this.setState({
      emailIsHidden: !this.state.emailIsHidden
    });
    console.log(this.state.input);
  }

  render() {
    return (
      <>
        <Typography>
          <h1>Profile Page</h1>
        </Typography>
        <Grid container className="profilePage">
          <ProfileFirstName
            firstNameIsHidden={this.state.firstNameIsHidden}
            firstName={this.state.firstName}
            firstNameButtonHandler={this.firstNameButtonHandler}
            handleInput={this.handleInput}
            handleFirstNameSubmit={this.handleFirstNameSubmit}
          ></ProfileFirstName>

          <ProfileLastName
            lastNameIsHidden={this.state.lastNameIsHidden}
            lastName={this.state.lastName}
            lastNameButtonHandler={this.lastNameButtonHandler}
            handleInput={this.handleInput}
            handleLastNameSubmit={this.handleLastNameSubmit}
          ></ProfileLastName>

          <ProfileEmail
            emailIsHidden={this.state.emailIsHidden}
            email={this.state.email}
            emailButtonHandler={this.emailButtonHandler}
            handleInput={this.handleInput}
            handleEmailSubmit={this.handleEmailSubmit}
          ></ProfileEmail>
        </Grid>
      </>
    );
  }
}
