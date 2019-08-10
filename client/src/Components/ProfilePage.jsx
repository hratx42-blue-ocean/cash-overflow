import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'email',
      emailIsHidden: true,
      firstName: 'name1',
      firstNameIsHidden: true,
      lastName: 'name2',
      lastNameIsHidden: true,
      input: ''
    };

    this.emailButtonHandler = this.emailButtonHandler.bind(this);
    this.firstNameButtonHandler = this.firstNameButtonHandler.bind(this);
    this.lastNameButtonHandler = this.lastNameButtonHandler.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  emailButtonHandler(e) {
    this.setState({
      emailIsHidden: !this.state.emailIsHidden
    });
  }
  firstNameButtonHandler(e) {
    console.log('click');
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

  render() {
    return (
      <Grid justify="center" alignItems="center">
        <h1>Profile Page</h1>
        {/* {make the following clickable for editing} */}
        <p>
          {this.state.firstName}
          <Button onClick={this.firstNameButtonHandler}>Edit</Button>
          {!this.state.firstNameIsHidden && (
            <Child handleInput={this.handleInput} />
          )}
        </p>
        <p>
          {this.state.lastName}
          <Button onClick={this.lastNameButtonHandler}>Edit</Button>
          {!this.state.lastNameIsHidden && (
            <Child handleInput={this.handleInput} />
          )}
        </p>
        <p>
          {this.state.email}
          <Button onClick={this.emailButtonHandler}>Edit</Button>
          {!this.state.emailIsHidden && (
            <Child handleInput={this.handleInput} />
          )}
        </p>
      </Grid>
    );
  }
}

const Child = props =>
  (Child.propTypes = {
    inputHandler: PropTypes.func
  })(
    <form autoComplete="off">
      <FormControl>
        <Input onChange={props.handleInput} />
      </FormControl>
    </form>
  );
