import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


const ProfileSetRP = props => {
    console.log(props)
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h4">Set a monthly payment reminder!</Typography>
      <Typography>Day of month:</Typography>
      <Select value={props.inputDay} onChange={props.handleDayChange}>
        {props.days.map(day => {
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
      <Select value={props.inputCategory} onChange={props.handleCategoryInput}>
        {props.categories.map((category, i) => {
          return (
            <MenuItem key={`categoryInput_${i}`} value={category.name}>
              {category.name}{' '}
            </MenuItem>
          );
        })}
      </Select>
      <Typography>Account:</Typography>
      <Select value={props.inputAccount} onChange={props.handleAccountInput}>
        {props.accounts.map((account, i) => {
          return (
            <MenuItem key={`accountInput_${i}`} value={account.name}>
              {account.name}
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
      <Button onClick={props.handleRecurringPayment} color="primary">
        Add monthly payment
      </Button>
    </Grid>
  );
};

export default ProfileSetRP;
