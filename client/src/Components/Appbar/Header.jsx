import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useAuth0 } from '../../react-auth0-wrapper';
import Logo from '../../images/dark-logo.png';

const styles = {
  root: {
    display: 'flex',
    background: 'transparent',
    color: '#7ed957',
    textDecoration: 'none',
    marginLeft: '50'
  },
  link: {
    background: 'transparent',
    textDecoration: 'none',
    position: 'absolute',
    color: '#7ed957',
    right: '0'
  }
};

function ButtonAppBar(props) {
  const { classes, isDemo, toggleDemo } = props;
  const { isAuthenticated, loading, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  let statusButton;

  if (isDemo) {
    statusButton = (
      <Button onClick={toggleDemo} className={classes.link} color="secondary">
        <Link to="/home" className={classes.root}>
          Exit the Demo
        </Link>
      </Button>
    );
  } else if (!isAuthenticated && !loading) {
    statusButton = (
      <Button
        onClick={() => loginWithRedirect({})}
        className={classes.link}
        color="secondary"
      >
        Login
      </Button>
    );
  } else if (isAuthenticated) {
    statusButton = (
      <Button
        onClick={() => logoutWithRedirect()}
        className={classes.link}
        color="inherit"
      >
        Logout
      </Button>
    );
  } else {
    statusButton = <></>;
  }

  return (
    <AppBar color="secondary" position="static">
      <Toolbar>
        <img src={Logo} style={{ width: 220, height: 80 }} alt="logo" />
        {isAuthenticated || isDemo ? (
          <Box className={classes.root}>
            <Button>
              <Link className={classes.root} color="primary" to="/dashboard">
                Dashboard
              </Link>
            </Button>
            <Button>
              <Link className={classes.root} color="primary" to="/accounts">
                Accounts
              </Link>
            </Button>
            <Button>
              <Link className={classes.root} color="primary" to="/budget">
                Budget
              </Link>
            </Button>
            <Button>
              <Link className={classes.root} color="primary" to="/trends">
                Trends
              </Link>
            </Button>
            <Button>
              <Link className={classes.root} color="primary" to="/profile">
                Profile
              </Link>
            </Button>
            {statusButton}
          </Box>
        ) : (
          <div>
            <Button
              onClick={() => loginWithRedirect({})}
              className={classes.link}
              color="secondary"
            >
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(ButtonAppBar);
