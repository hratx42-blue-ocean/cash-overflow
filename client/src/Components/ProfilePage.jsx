import React from 'react';
import PropTypes from 'prop-types';
import ProfileFirstName from './ProfileFirstName.jsx';
import ProfileLastName from './ProfileLastName.jsx';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

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
      <div className="profilePage">
        <h1>Profile Page</h1>
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

        <p>
          {this.state.email}
          <Button onClick={this.emailButtonHandler}>Edit</Button>
          {!this.state.emailIsHidden && (
            <Child
              handleInput={this.handleInput}
              handleSubmit={this.handleSubmit}
            />
          )}
        </p>
      </div>
    );
  }
}

const Child = props => {
  Child.propTypes = {
    handleInput: PropTypes.func,
    handleSubmit: PropTypes.func
  };
  return (
    <form autoComplete="off">
      <FormControl>
        <Input onChange={props.handleInput} />
      </FormControl>
      <Button onClick={props.handleSubmit}>Save</Button>
    </form>
  );
};
