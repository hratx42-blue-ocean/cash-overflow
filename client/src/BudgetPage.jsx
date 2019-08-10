import React from 'react';
// import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'green',
    borderWidth: 5,
    borderColor: 'black',
    color: 'blue',
    flexGrow: 1
  },
  item: {
    backgroundColor: 'yellow'
  }
}));

export default function Budget() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid container direction="row">
          <Grid item xs={3}>
            <span textAlign> Category</span>
          </Grid>
          <Grid item xs={3}>
            Remaining $
          </Grid>
          <Grid item xs={3}>
            Alloted $
          </Grid>
          <Grid item xs={3}>
            Spent $
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
