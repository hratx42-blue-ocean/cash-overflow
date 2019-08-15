import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function AlertCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="alertCircle" className={classes.avatar}>
            !
          </Avatar>
        }
        title="Budget Alert"
        subheader={props.alertHeader}
      />
      <CardContent>
        <Typography variant="h5" color="textSecondary" component="p">
          Alert for {props.budgetCategory}
        </Typography>
        <Typography variant="body2" component="p">
          You have {props.alertType} for your {props.budgetCategory} category.
          You were budgeted to spend ${props.allotment} and you have spent $
          {props.spent}. Be careful!
        </Typography>
      </CardContent>
    </Card>
  );
}
