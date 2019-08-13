import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
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
              <Button onClick={props.passwordButtonHandler}>Edit</Button>
              {!props.passwordIsHidden && (
                <form autoComplete="off">
                  <FormControl>
                    <Input
                      placeholder="current password"
                      onChange={props.handleInput}
                    />
                  </FormControl>
                  {/* <Button onClick={props.handleLastNameSubmit}>Save</Button> */}
                </form>
              )}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePassword;

//create field for current password
//needs endpoint for password check
//.then(if response is correct, allow user to input new password (render new input field))
//.then(render new input field to confirm new password)
//.then(if the two inputs match, send new password to db)
//.catch('incorrect password')
