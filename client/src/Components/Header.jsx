import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useAuth0 } from '../react-auth0-wrapper';
import { withStyles } from '@material-ui/styles';

const styles = {};

function ButtonAppBar(props) {
  const { classes } = props;
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
            <Box className={classes.navBox}>
              <Button color="inherit" className={classes.link}>
                <Link to="/dashboard" className={classes.link}>
                  Dashboard
                </Link>
              </Button>
              <Button color="inherit" className={classes.link}>
                <Link to="/accounts" className={classes.link}>
                  Accounts
                </Link>
              </Button>
              <Button color="inherit" className={classes.link}>
                <Link to="/budget" className={classes.link}>
                  Budget
                </Link>
              </Button>
              <Button color="inherit" className={classes.link}>
                <Link to="/trends" className={classes.link}>
                  Trends
                </Link>
              </Button>
              <Button color="inherit" className={classes.link}>
                <Link to="/profile" className={classes.link}>
                  Profile
                </Link>
              </Button>
            </Box>
          ) : (
            <></>
          )}
          {!isAuthenticated ? (
            !loading ? (
              <Button onClick={() => loginWithRedirect({})} color="inherit">
                Login
              </Button>
            ) : (
              <></>
            )
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
