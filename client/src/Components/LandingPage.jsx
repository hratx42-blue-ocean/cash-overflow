import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mainTitle: {
    fontFamily: 'Lobster Two',
    color: '#58355e',
  },
  subtitle: {
    fontFamily: 'Open Sans',
  },
  button: {
    fontFamily: 'Lobster Two',
    backgroundColor: '#71E7C7',
    color: '#ffffff',
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff',
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <div className="landingPage">
      <Grid item />
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h2" className={classes.mainTitle}>
            Cash Overflow
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            The simplest way to manage your money, figure out your overspending,
            and get peace of mind about your budget
          </Typography>
          <Button color="inherit" className={classes.button}>
            <Link to="/dashboard" className={classes.link}>
              Login
            </Link>
          </Button>
        </Paper>
      </Grid>
      <Grid item />
    </div>
  );
}

export default LandingPage;
