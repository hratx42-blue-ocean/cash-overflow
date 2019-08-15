import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    width: 600,
    margin: 20,
    textAlign: 'center'
  }
}));

const ProfilePassword = props => {
  const classes = useStyles();

  ProfilePassword.propTypes = {
    // lastName: PropTypes.string,
    passwordIsHidden: PropTypes.bool,
    passwordButtonHandler: PropTypes.func,
    closePasswordResetMessage: PropTypes.func,
    handleInput: PropTypes.func,
    handleLastNameSubmit: PropTypes.func
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h5">
              Password
            </Typography>
            {/* <Typography>{props.lastName}</Typography> */}
            <Typography>
              <Button onClick={props.passwordButtonHandler}>
                Reset Password
              </Button>
              {!props.passwordIsHidden && (
                <>
                  <p>Check your email for password reset instructions!</p>
                  <Button onClick={props.closePasswordResetMessage}>
                    Close
                  </Button>
                </>
              )}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePassword;
