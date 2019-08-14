import React from 'react';
import ProfileFirstName from './ProfileFirstName.jsx';
import ProfileLastName from './ProfileLastName.jsx';
import ProfileEmail from './ProfileEmail.jsx';
import PropTypes from 'prop-types';
import ProfilePassword from './ProfilePassword.jsx';
import { Typography, Grid } from '@material-ui/core';
import axios from 'axios';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.user.email,
      emailIsHidden: true,
      firstName: this.props.user.firstName,
      firstNameIsHidden: true,
      lastName: this.props.user.lastName,
      lastNameIsHidden: true,
      input: '',
      passwordIsHidden: true
    };

    this.emailButtonHandler = this.emailButtonHandler.bind(this);
    this.firstNameButtonHandler = this.firstNameButtonHandler.bind(this);
    this.lastNameButtonHandler = this.lastNameButtonHandler.bind(this);
    this.passwordButtonHandler = this.passwordButtonHandler.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFirstNameSubmit = this.handleFirstNameSubmit.bind(this);
    this.handleLastNameSubmit = this.handleLastNameSubmit.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.closePasswordResetMessage = this.closePasswordResetMessage.bind(this);
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

  passwordButtonHandler(e) {
    axios
      .post({
        method: 'POST',
        url: 'https://greenocean.auth0.com/dbconnections/change_password',
        headers: { 'content-type': 'application/json' },
        body: {
          client_id: '05RvxwAP7dSW5I9uPHxP6m7hVKHoIjS3',
          email: this.state.email,
          connection: 'Username-Password-Authentication'
        },
        json: true
      })
      .then(this.setState({ passwordIsHidden: !this.state.passwordIsHidden }))
      .catch(err => {
        throw err;
      });
  }

  closePasswordResetMessage() {
    this.setState({ passwordIsHidden: !this.setState.passwordIsHidden });
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
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
        className="profilePage"
      >
        <ProfileFirstName
          className="firstName"
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

        <ProfilePassword
          passwordIsHidden={this.state.passwordIsHidden}
          passwordButtonHandler={this.passwordButtonHandler}
          closePasswordResetMessage={this.closePasswordResetMessage}
        ></ProfilePassword>
      </Grid>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object
};
