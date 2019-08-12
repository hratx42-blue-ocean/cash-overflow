import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
      <Typography>
        <h5>Last Name</h5>
        <p>{props.lastName}</p>
        <Button onClick={props.lastNameButtonHandler}>Edit</Button>
        {!props.lastNameIsHidden && (
          <form autoComplete="off">
            <FormControl>
              <Input onChange={props.handleInput} />
            </FormControl>
            <Button onClick={props.handleLastNameSubmit}>Save</Button>
          </form>
        )}
      </Typography>
    </Paper>
  );
};

export default ProfileLastName;
