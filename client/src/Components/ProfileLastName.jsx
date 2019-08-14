import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    width: 600,
    margin: 20,
    textAlign: 'center',
  },
}));

const ProfileLastName = (props) => {
  const classes = useStyles();

  ProfileLastName.propTypes = {
    lastName: PropTypes.string,
    lastNameIsHidden: PropTypes.bool,
    lastNameButtonHandler: PropTypes.func,
    handleInput: PropTypes.func,
    handleLastNameSubmit: PropTypes.func,
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h5">
              Last Name
            </Typography>
            <Typography>{props.lastName}</Typography>
            <Typography>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileLastName;
