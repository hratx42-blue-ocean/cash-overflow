import React from 'react';
import ProfileRPSuccess from './ProfileRPSuccess.jsx';
import ProfileSetRP from './ProfileSetRP.jsx';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 20,
    width: '90%',
    marginTop: 20,
    textAlign: 'center', 
    height: 480,
    marginLeft: 20

  }
}));

const ProfileRecurringPayments = props => {
  const classes = useStyles();
  const days = Array.from(Array(31).keys()).splice(1);

  return (
    <div>
      {props.showSuccessMessage ? (
        <Paper className={classes.paper}>
          <ProfileRPSuccess toggleSuccessMessage={props.toggleSuccessMessage} />
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <ProfileSetRP
            inputDay={props.inputDay}
            handleDayChange={props.handleDayChange}
            days={days}
            handleInputAmount={props.handleInputAmount}
            inputCategory={props.inputCategory}
            categories={props.categories}
            inputAccount={props.inputAccount}
            handleAccountInput={props.handleAccountInput}
            handlePayeeInput={props.handlePayeeInput}
            handleRecurringPayment={props.handleRecurringPayment}
            accounts={props.accounts}
          ></ProfileSetRP>
        </Paper>
      )}
    </div>
  );
};

export default ProfileRecurringPayments;
