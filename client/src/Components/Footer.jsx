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
import Grid from '@material-ui/core/Grid';

const engineersLeft = [
  { name: 'Garett Welson', link: 'https://www.linkedin.com/in/garrettwelson/' , imageURL: 'https://binkardfecimages.s3.us-east-2.amazonaws.com/cashOverflowHeadshots/GW+Headshot.jpg'},
  { name: 'Ross Calimlin', link: 'https://www.linkedin.com/in/rcalimlim/', imageURL: 'https://binkardfecimages.s3.us-east-2.amazonaws.com/cashOverflowHeadshots/RC+Headshot.png' },
  {
    name: 'Doris Hui',
    link: 'https://www.linkedin.com/in/dorishui/',
    imageURL:
      'https://binkardfecimages.s3.us-east-2.amazonaws.com/cashOverflowHeadshots/DH+headshot.png'
  },
  {
    name: 'Kevin Bench',
    link: 'https://www.linkedin.com/in/kevin-bench/',
    imageURL:
      'https://binkardfecimages.s3.us-east-2.amazonaws.com/cashOverflowHeadshots/KB+Headshot.png'
  }
];

const engineersRight = [
  {
    name: 'Evelyn Binkard',
    link: 'https://www.linkedin.com/in/evelynbinkard/',
    imageURL:
      'https://binkardfecimages.s3.us-east-2.amazonaws.com/cashOverflowHeadshots/EB+HeadShot.png'
  },
  {
    name: 'Mitchell Dill',
    link: 'https://www.linkedin.com/in/mitchelladill/',
    imageURL:
      'https://binkardfecimages.s3.us-east-2.amazonaws.com/cashOverflowHeadshots/MD+Headshot.jpg'
  },
  {
    name: 'Jordan Dilliard',
    link: 'https://www.linkedin.com/in/jordan-dillard/',
    imageURL:
      'https://binkardfecimages.s3.us-east-2.amazonaws.com/cashOverflowHeadshots/JD+Headshot.jpg'
  },
  {
    name: 'Brandon Leafman',
    link: 'https://www.linkedin.com/in/brandonleafman/',
    imageURL:
      'https://binkardfecimages.s3.us-east-2.amazonaws.com/cashOverflowHeadshots/BL+Headshot.png'
  }
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
    background: '#7F7F7F',
    left: 10,
    right: 10,
    bottom: 4,
    minHeight: 10
  },
  engineer: {
    color: '#3f51b5',
    '&:hover': {
      color: 'blue'
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
        <Dialog
          fullWidth={true}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle>Team Cash Overflow</DialogTitle>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <List>
                {engineersLeft.map(engineer => (
                  <ListItem
                    className={classes.engineer}
                    key={engineer.name}
                    onClick={() => window.open(engineer.link, '_blank')}
                  >
                    <img
                      style={{ width: 60, borderRadius: '50%' }}
                      src={engineer.imageURL}
                    ></img>{' '}
                    <ListItemText
                      style={{ padding: '15px' }}
                      primary={engineer.name}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={6}>
              <List>
                {engineersRight.map(engineer => (
                  <ListItem
                    className={classes.engineer}
                    key={engineer.name}
                    onClick={() => window.open(engineer.link, '_blank')}
                  >
                    <img
                      style={{ width: 60, 'border-radius': '50%' }}
                      src={engineer.imageURL}
                    ></img>{' '}
                    <ListItemText
                      style={{ padding: '15px' }}
                      primary={engineer.name}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
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
