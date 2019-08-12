import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

const ProfileFirstName = props => {
  ProfileFirstName.propTypes = {
    firstName: PropTypes.string,
    firstNameIsHidden: PropTypes.bool,
    firstNameButtonHandler: PropTypes.func,
    handleInput: PropTypes.func,
    handleFirstNameSubmit: PropTypes.func
  };
  return (
    <Paper>
      {props.firstName}
      <Button onClick={props.firstNameButtonHandler}>Edit</Button>
      {!props.firstNameIsHidden && (
        <form autoComplete="off">
          <FormControl>
            <Input onChange={props.handleInput} />
          </FormControl>
          <Button onClick={props.handleFirstNameSubmit}>Save</Button>
        </form>
      )}
    </Paper>
  );
};

export default ProfileFirstName;
