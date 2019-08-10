import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'email',
      emailIsHidden: true,
      firstName: 'name1',
      firstNameIsHidden: true,
      lastName: 'name2',
      lastNameIsHidden: true
    };

    this.emailButtonHandler = this.emailButtonHandler.bind(this);
    this.firstNameButtonHandler = this.firstNameButtonHandler.bind(this);
    this.lastNameButtonHandler = this.lastNameButtonHandler.bind(this);
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

  render() {
    return (
      <Grid justify="center" alignItems="center">
        <h1>Profile Page</h1>
        {/* {make the following clickable for editing} */}
        <p>
          {this.state.firstName}
          <Button onClick={this.firstNameButtonHandler}>Edit</Button>
          {!this.state.firstNameIsHidden && <Child />}
        </p>
        <p>
          {this.state.lastName}
          <Button onClick={this.lastNameButtonHandler}>Edit</Button>
          {!this.state.lastNameIsHidden && <Child />}
        </p>
        <p>
          {this.state.email}
          <Button onClick={this.emailButtonHandler}>Edit</Button>
          {!this.state.emailIsHidden && <Child />}
        </p>
      </Grid>
    );
  }
}

const Child = () => (
  <form autoComplete="off">
    <FormControl>
      <BootstrapInput />
    </FormControl>
  </form>
);
