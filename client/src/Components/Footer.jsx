import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useAuth0 } from '../react-auth0-wrapper';
import { mergeClasses } from '@material-ui/styles';

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
    color: '#ffffff',
    padding: 0,
    margin: 2
  },
  toolbar: {
    position: 'fixed',
    background: '#5EB299',
    left: 10,
    right: 10,
    bottom: 4,
    minHeight: 10
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root} color="primary">
      <Toolbar height={4} width={1} className={classes.toolbar}>
        <Button className={classes.link}>About Us</Button>
      </Toolbar>
    </div>
  );
}
