import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red, green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: red[500]
  },
  avatarHappy: {
    backgroundColor: green[500]
  }
}));

export default function AlertCard(props) {
  const classes = useStyles();
  if (props.alertType === 'Payment Reminder') {
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
            You have a payment coming up to {props.payee} for ${props.amount}{' '}
            coming up on {props.date.toDateString()}. Don't forget!
          </Typography>
        </CardContent>
      </Card>
    );
  }
  if (props.alertType === 'No Alerts') {
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="alertCircle" className={classes.avatarHappy}>
              {':)'}
            </Avatar>
          }
          title="Keep it up!"
          subheader={props.alertHeader}
        />
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="p">
            Sticking to a budget can be tough,
          </Typography>
          <Typography variant="body2" component="p">
            but it looks like you're making it work. Great job!
          </Typography>
        </CardContent>
      </Card>
    );
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
