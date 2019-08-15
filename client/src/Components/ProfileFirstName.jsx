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

const ProfileFirstName = props => {
  const classes = useStyles();
  ProfileFirstName.propTypes = {
    firstName: PropTypes.string,
    firstNameIsHidden: PropTypes.bool,
    firstNameButtonHandler: PropTypes.func,
    handleInput: PropTypes.func,
    handleFirstNameSubmit: PropTypes.func
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h5">
          First Name
        </Typography>
        <Typography>{props.firstName}</Typography>
        <Typography>
          <Button className="edit" onClick={props.firstNameButtonHandler}>
            Edit
          </Button>
          {!props.firstNameIsHidden && (
            <form autoComplete="off">
              <FormControl>
                <Input onChange={props.handleInput} />
              </FormControl>
              <Button onClick={props.handleFirstNameSubmit}>Save</Button>
            </form>
          )}
        </Typography>
      </Paper>
    </div>
  );
};

export default ProfileFirstName;
