import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

const ProfileLastName = props => {
  ProfileLastName.propTypes = {
    lastName: PropTypes.string,
    lastNameIsHidden: PropTypes.bool,
    lastNameButtonHandler: PropTypes.func,
    handleInput: PropTypes.func,
    handleLastNameSubmit: PropTypes.func
  };
  return (
    <Paper>
      {props.lastName}
      <Button onClick={props.lastNameButtonHandler}>Edit</Button>
      {!props.lastNameIsHidden && (
        <form autoComplete="off">
          <FormControl>
            <Input onChange={props.handleInput} />
          </FormControl>
          <Button onClick={props.handleLastNameSubmit}>Save</Button>
        </form>
      )}
    </Paper>
  );
};

export default ProfileLastName;
