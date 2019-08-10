import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    //send input to updatedatabase
    console.log('submit');
  }

  render() {
    return (
      <div className="profilePage">
        <h1>Profile Page</h1>

        <p>
          {this.state.firstName}
          <Button onClick={this.firstNameButtonHandler}>Edit</Button>
          {!this.state.firstNameIsHidden && (
            <Child
              handleInput={this.handleInput}
              handleSubmit={this.handleSubmit}
            />
          )}
        </p>
        <p>
          {this.state.lastName}
          <Button onClick={this.lastNameButtonHandler}>Edit</Button>
          {!this.state.lastNameIsHidden && (
            <Child
              handleInput={this.handleInput}
              handleSubmit={this.handleSubmit}
            />
          )}
        </p>
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
