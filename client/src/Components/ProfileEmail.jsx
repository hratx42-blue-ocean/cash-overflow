import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const ProfileEmail = props => {
  ProfileEmail.propTypes = {
    email: PropTypes.string,
    emailIsHidden: PropTypes.bool,
    emailButtonHandler: PropTypes.func,
    handleInput: PropTypes.func,
    handleEmailSubmit: PropTypes.func
  };
  return (
    <Paper>
      <Typography>
        <h5>email</h5>
        <p>{props.email}</p>
        <Button onClick={props.emailButtonHandler}>Edit</Button>
        {!props.emailIsHidden && (
          <form autoComplete="off">
            <FormControl>
              <Input onChange={props.handleInput} />
            </FormControl>
            <Button onClick={props.handleEmailSubmit}>Save</Button>
          </form>
        )}
      </Typography>
    </Paper>
  );
};

export default ProfileEmail;
