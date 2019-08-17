import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useAuth0 } from '../react-auth0-wrapper';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    display: 'flex',
    background: 'transparent',
    borderRadius: 3,
    border: 0,
    spacing: 4,
    color: 'white',
    textDecoration: 'none',
    flexDirection: 'row',
    marginLeft: '50'
  },
  link: {
    background: 'transparent',
    borderRadius: 3,
    border: 0,
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'row',
    float: 'right',
    position: 'absolute',
    right: '0'
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  const { isAuthenticated, loading, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Cash Overflow
        </Typography>
        {isAuthenticated ? (
          <Box className={classes.root}>
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
            <Button
              className={classes.link}
              onClick={() => loginWithRedirect({})}
              color="secondary"
            >
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
  );
}

export default withStyles(styles)(ButtonAppBar);
