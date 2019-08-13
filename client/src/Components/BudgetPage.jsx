import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { textAlign } from '@material-ui/system';
// import BudgetCategory from './BudgetCategory.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    fontSize: '2rem',
    padding: theme.spacing(5),
    textAlign: 'center'
  }
}));

export default function BudgetPage(props) {
  console.log('categories are: ', props.categories);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="stretch"
              spacing={1}
            >
              <Grid item xs={6}>
                <Paper className={classes.paper}>col 0</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>col 1</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>col 2</Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper className={classes.paper}>col 3</Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

BudgetPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object)
};
