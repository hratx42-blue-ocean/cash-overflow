import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { InputLabel, FormHelperText } from '@material-ui/core';

const ProfileSetRP = props => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h5">Set monthly reminders</Typography>
      <FormHelperText style={{ paddingTop: 5 }}>Day of month:</FormHelperText>
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
        style={{marginTop: 10, paddingTop: 10}}
      />
      
          <FormHelperText style={{ paddingTop: 5 }}>
            Budget Category:
          </FormHelperText>
          <Select
            value={props.inputCategory}
            onChange={props.handleCategoryInput}
            style={{width: '80%'}}
          >
            {props.categories.map((category, i) => {
              return (
                <MenuItem key={`categoryInput_${i}`} value={category.name}>
                  {category.name}{' '}
                </MenuItem>
              );
            })}
          </Select>
     
          <FormHelperText style={{ paddingTop: 5 }}>Account</FormHelperText>
          <Select
            value={props.inputAccount}
            onChange={props.handleAccountInput}
            style={{width: '80%'}}
          >
            {props.accounts.map((account, i) => {
              return (
                <MenuItem key={`accountInput_${i}`} value={account.name}>
                  {account.name}
                </MenuItem>
              );
            })}
          </Select>
   
      <TextField
        id="payee"
        label="payee"
        onChange={props.handlePayeeInput}
        margin="normal"
      />

      <Button style={{paddingTop: 30}} onClick={props.handleRecurringPayment} color="primary">
        Add monthly payment
      </Button>
    </Grid>
  );
};

export default ProfileSetRP;
