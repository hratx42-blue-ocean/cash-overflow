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
  {name: 'Garett Welson', link:'https://www.linkedin.com/in/garrettwelson/' },
  {name: 'Ross Calimlin', link: 'https://www.linkedin.com/in/rcalimlim/' },
  {name: 'Doris Hui', link: 'https://www.linkedin.com/in/dorishui/'},
  {name: 'Kevin Bench', link: 'https://www.linkedin.com/in/kevin-bench/'},
  {name: 'Evelyn Binkard', link: 'https://www.linkedin.com/in/evelynbinkard/'},
  {name: 'Mitchell Dill', link: 'https://www.linkedin.com/in/mitchelladill/'},
  {name: 'Jordan Dilliard', link: 'https://www.linkedin.com/in/jordan-dillard/'},
  {name: 'Brandon Leafman', link: 'https://www.linkedin.com/in/brandonleafman/'}
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
    margin: 2,


  },
  toolbar: {
    position: 'fixed',
    background: '#3f51b5',
    left: 10,
    right: 10,
    bottom: 4,
    minHeight: 10
  },
  engineer: {
    color: '#3f51b5',
    '&:hover': {
      color: "blue",
   }
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
          
              <ListItem className={classes.engineer} key={engineer.name} onClick={()=> window.open(engineer.link, "_blank")}>
                <ListItemText primary={engineer.name} />
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
