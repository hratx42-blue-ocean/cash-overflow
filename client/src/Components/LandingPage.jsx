import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-wrapper';
import Loading from './Loading.jsx';
// import Logo from './Logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    margin: theme.spacing(4),
    textAlign: 'center',
    alignContent: 'center',
    color: theme.palette.text.secondary
  },
  mainTitle: {
    fontFamily: 'Lobster Two',
    color: '#58355e'
  },
  subtitle: {
    fontFamily: 'Open Sans'
  },
  button: {
    fontFamily: 'Open Sans',
    backgroundColor: '#7ED957',
    color: '#ffffff',
    margin: theme.spacing(6)
  },
  link: {
    textDecoration: 'none',
    color: '#880e4f'
  }
}));

function LandingPage(props) {
  const classes = useStyles();
  const { loginWithRedirect, isAuthenticated, loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="landingPage"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Grid item />
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <img
            src="Logo.png"
            style={{ margin: 20, width: '25vw' }}
            alt="logo"
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item />
            <Grid item xs={6}>
              <Button
                onClick={props.toggleDemo}
                color="inherit"
                className={classes.button}
              >
                Demo Mode
              </Button>
            </Grid>
            <Grid item />
          </div>
        </Paper>
      </Grid>
      <Grid item />
    </div>
  );
}

export default LandingPage;
