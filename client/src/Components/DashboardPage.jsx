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

function DashboardPage() {
  const classes = useStyles();

  return (
    <>
      <Grid item />
      <Grid item xs={12}>
        <Paper className={classes.paper}>DashboardPage</Paper>
      </Grid>
      <Grid item />
    </>
  );
}

export default DashboardPage;
