import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  navBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  title: {
    flexGrow: 1
  },
  link: {
    textDecoration: 'none',
    color: '#ffffff'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Green Ocean
          </Typography>
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
