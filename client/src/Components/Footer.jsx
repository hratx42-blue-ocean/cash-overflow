import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useAuth0 } from '../react-auth0-wrapper';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const engineers = [
  'Garett Welson',
  'Ross Calimlin',
  'Doris Hui',
  'Kevin Bench',
  'Evelyn Binkard',
  'Mitchell Dill',
  'Jordan Dilliard',
  'Brandon Leafman'
];

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
    background: '#3f51b5',
    left: 10,
    right: 10,
    bottom: 4,
    minHeight: 10
  }
}));

export default function Footer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <Toolbar height={4} width={1} className={classes.toolbar}>
        <Button onClick={handleClickOpen} className={classes.link}>
          About Us
        </Button>
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle>Team Cash Overflow</DialogTitle>
          <List>
            {engineers.map(engineer => (
              <ListItem key={engineer}>
                <ListItemText primary={engineer} />
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </div>
  );
}
