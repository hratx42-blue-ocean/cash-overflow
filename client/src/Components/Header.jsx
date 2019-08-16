/* eslint-disable no-nested-ternary */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useAuth0 } from '../react-auth0-wrapper';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    background: 'transparent',
    borderRadius: 3,
    border: 0,
    color: 'white',
    textDecoration: 'none'
  }
};

function ButtonAppBar(props) {
  const { classes, isDemo, toggleDemo } = props;
  const { isAuthenticated, loading, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Cash Overflow
          </Typography>
          {isAuthenticated ? (
            <Box>
              <Button>
                <Link to="/dashboard" className={classes.root}>
                  Dashboard
                </Link>
              </Button>
              <Button>
                <Link className={classes.root} to="/accounts">
                  Accounts
                </Link>
              </Button>
              <Button>
                <Link className={classes.root} to="/budget">
                  Budget
                </Link>
              </Button>
              <Button>
                <Link className={classes.root} to="/trends">
                  Trends
                </Link>
              </Button>
              <Button>
                <Link className={classes.root} to="/profile">
                  Profile
                </Link>
              </Button>
            </Box>
          ) : (
            <></>
          )}
          {!isAuthenticated ? (
            !loading ? (
              <Button onClick={() => loginWithRedirect({})} color="secondary">
                Login
              </Button>
            ) : (
              <></>
            )
          ) : isDemo ? (
            <Button onClick={toggleDemo} color="inherit">
              <Link to="/home">Exit the Demo</Link>
            </Button>
          ) : (
            <Button
              className={classes.link}
              onClick={() => logoutWithRedirect()}
              color="inherit"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
