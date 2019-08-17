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
    <AppBar color="primary" position="static">
      <Toolbar>
        <Typography
          variant="h4"
          className={classes.title}
          style={{ fontFamily: 'Lobster Two', fontWeight: 'fontWeightBold' }}
        >
          <img src="darkLogo.png" style={{ width: 90, height: 60 }} />
        </Typography>
        {isAuthenticated || isDemo ? (
          <Box className={classes.root}>
            <Button>
              <Link className={classes.root} color="secondary" to="/dashboard">
                Dashboard
              </Link>
            </Button>
            <Button>
              <Link className={classes.root} color="secondary" to="/accounts">
                Accounts
              </Link>
            </Button>
            <Button>
              <Link className={classes.root} color="secondary" to="/budget">
                Budget
              </Link>
            </Button>
            <Button>
              <Link className={classes.root} color="secondary" to="/trends">
                Trends
              </Link>
            </Button>
            <Button>
              <Link className={classes.root} color="secondary" to="/profile">
                Profile
              </Link>
            </Button>
            {statusButton}
          </Box>
        ) : (
          <Button
            onClick={() => loginWithRedirect({})}
            className={classes.link}
            color="secondary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(ButtonAppBar);
