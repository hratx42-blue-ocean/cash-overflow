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
  }
}));

const DashboardLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/dashboard" {...props} />
));

const AccountsLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/accounts" {...props} />
));

const BudgetLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/budget" {...props} />
));

const TrendsLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/trends" {...props} />
));

const ProfileLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/profile" {...props} />
));

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
            <Button
              color="inherit"
              component={DashboardLink}
              className={classes.menuButton}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              component={AccountsLink}
              className={classes.menuButton}
            >
              Accounts
            </Button>
            <Button
              color="inherit"
              component={BudgetLink}
              className={classes.menuButton}
            >
              Budget
            </Button>
            <Button
              color="inherit"
              component={TrendsLink}
              className={classes.menuButton}
            >
              Trends
            </Button>
            <Button
              color="inherit"
              component={ProfileLink}
              className={classes.menuButton}
            >
              Profile
            </Button>
          </Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
