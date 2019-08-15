import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    width: 400,
    margin: 20,
    textAlign: 'center'
  }
}));

const ProfilePRSuccess = props => {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography>Henlo!</Typography>
            <Button onClick={props.toggleSuccessMessage}>OK</Button>
        </Grid>
    )
}

export default ProfilePRSuccess;