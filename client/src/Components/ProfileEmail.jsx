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
    width: 300,
    margin: 20,
    textAlign: 'center'
  }
}));

const ProfileEmail = props => {
  const classes = useStyles();

  ProfileEmail.propTypes = {
    email: PropTypes.string,
    emailIsHidden: PropTypes.bool,
    emailButtonHandler: PropTypes.func,
    handleInput: PropTypes.func,
    handleEmailSubmit: PropTypes.func
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h5">
              Email
            </Typography>
            <Typography>{props.email}</Typography>
            <Typography>
              <Button onClick={props.emailButtonHandler}>Edit</Button>
              {!props.emailIsHidden && (
                <form autoComplete="off">
                  <FormControl>
                    <Input fullwidth="true" onChange={props.handleInput} />
                  </FormControl>
                  <Button onClick={props.handleEmailSubmit}>Save</Button>
                </form>
              )}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileEmail;
