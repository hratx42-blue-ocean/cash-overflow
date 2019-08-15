import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    width: 600,
    margin: 20,
    textAlign: 'center'
  }
}));

const ProfileRecurringPayments = props => {
  console.log('props in recurring:', props);
  const classes = useStyles();
  const days = Array.from(Array(31).keys()).splice(1);

  return (
    <Paper style={{ width: '40%', margin: 20, padding: 15 }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h4">Set a payment for every month!</Typography>
        <Typography>Day of month:</Typography>
        <Select value={1} onChange={props.handleDayChange}>
          {days.map(day => {
            return (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            );
          })}
        </Select>

        <TextField
          id="amount"
          label="amount"
          type="number"
          onChange={props.handleInputAmount}
          margin="normal"
        />
        <Typography>Budget Category</Typography>
        <Select onChange={() => console.log('line 89')}>
          {props.categories.map((category, i) => {
            return (
              <MenuItem key={`categoryInput_${i}`} value={category.name}>
                {category.name}{' '}
              </MenuItem>
            );
          })}
        </Select>
        <Typography>Account:</Typography>
        <Select onChange={props.handleAccountInput}>
          {props.accounts.map((account, i) => {
            return (
              <MenuItem key={`accountInput_${i}`} value={account}>
                {account}
              </MenuItem>
            );
          })}
        </Select>
        <Typography>Payee:</Typography>
        <TextField
          id="payee"
          label="payee"
          onChange={props.handlePayeeInput}
          margin="normal"
        />
        <Button
          onClick={() => console.log('profile recur payments')}
          color="primary"
        >
          Add monthly payment
        </Button>
      </Grid>
    </Paper>
  );
};

export default ProfileRecurringPayments;
