import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

function ErrorPage() {
  const classes = useStyles();

  return (
    <>
      <Grid item />
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          Oh no! You&apos;ve found our 404 page!
        </Paper>
      </Grid>
      <Grid item />
    </>
  );
}

export default ErrorPage;
