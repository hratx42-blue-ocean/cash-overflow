import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Auth0Context } from '../react-auth0-wrapper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 10,
    height: '100%',
    width: '100%',
    marginTop: 20,
    textAlign: 'center'
  }
}));

const ProfilePassword = props => {
  const classes = useStyles();

  ProfilePassword.propTypes = {
    passwordIsHidden: PropTypes.bool,
    passwordButtonHandler: PropTypes.func,
    closePasswordResetMessage: PropTypes.func,
    handleInput: PropTypes.func,
    handleLastNameSubmit: PropTypes.func
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h5">
          Password
        </Typography>
        <Typography>
          <Button onClick={props.passwordButtonHandler}>Reset Password</Button>
          {!props.passwordIsHidden && (
            <>
              <p>Check your email for password reset instructions!</p>
              <Button onClick={props.closePasswordResetMessage}>Close</Button>
            </>
          )}
        </Typography>
      </Paper>
    </div>
  );
};

export default ProfilePassword;
