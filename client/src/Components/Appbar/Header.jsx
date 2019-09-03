import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useAuth0 } from '../../react-auth0-wrapper';
// import Logo from '../../images/dark-logo.png';

const useStyles = makeStyles({
  root: {
    flewGrow: 1
  },
  title: {
    flexGrow: 1,
    marginLeft: '30px'
  }
});

const Appbar = props => {
  const { isDemo, toggleDemo } = props;
  const { isAuthenticated, loading, loginWithRedirect, logout } = useAuth0();
  const classes = useStyles();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  let statusButton;

  if (isDemo) {
    statusButton = (
      <Button onClick={toggleDemo} color="secondary">
        <Link component={RouterLink} to="/home">
          Exit Demo
        </Link>
      </Button>
    );
  } else if (!isAuthenticated && !loading) {
    statusButton = (
      <Button onClick={() => loginWithRedirect({})} color="secondary">
        Login
      </Button>
    );
  } else if (isAuthenticated) {
    statusButton = (
      <Button onClick={() => logoutWithRedirect()} color="inherit">
        Logout
      </Button>
    );
  } else {
    statusButton = <></>;
  }

  // return (
  //   <div className={classes.root}>
  //     <AppBar color="secondary" position="static">
  //       <Toolbar>
  //         {/* <img className={classes.logo} src={Logo} alt="logo" /> */}
  //         <div className={classes.grow}> Should grow </div>
  //         {isAuthenticated || isDemo ? (
  //           <>
  //             <Button color="inherit">
  //               <Link component={RouterLink} to="/dashboard">
  //                 Dashboard
  //               </Link>
  //             </Button>
  //             <Button>
  //               <Link component={RouterLink} to="/accounts">
  //                 Accounts
  //               </Link>
  //             </Button>
  //             <Button>
  //               <Link component={RouterLink} to="/budget">
  //                 Budget
  //               </Link>
  //             </Button>
  //             <Button>
  //               <Link component={RouterLink} to="/trends">
  //                 Trends
  //               </Link>
  //             </Button>
  //             <Button>
  //               <Link component={RouterLink} to="/profile">
  //                 Profile
  //               </Link>
  //             </Button>
  //             {statusButton}
  //           </>
  //         ) : (
  //           <>
  //             <Button onClick={() => loginWithRedirect({})} color="secondary">
  //               Login
  //             </Button>
  //           </>
  //         )}
  //       </Toolbar>
  //     </AppBar>
  //   </div>
  // );

  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Cash Overflow
          </Typography>
          {isAuthenticated || isDemo ? (
            <>
              <Button color="inherit">
                <Link component={RouterLink} to="/dashboard">
                  Dashboard
                </Link>
              </Button>
              <Button>
                <Link component={RouterLink} to="/accounts">
                  Accounts
                </Link>
              </Button>
              <Button>
                <Link component={RouterLink} to="/budget">
                  Budget
                </Link>
              </Button>
              <Button>
                <Link component={RouterLink} to="/trends">
                  Trends
                </Link>
              </Button>
              <Button>
                <Link component={RouterLink} to="/profile">
                  Profile
                </Link>
              </Button>
              {statusButton}
            </>
          ) : (
            <>
              <Button onClick={() => loginWithRedirect({})} color="secondary">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
