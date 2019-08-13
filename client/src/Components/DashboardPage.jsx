import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MomentUtils from '@date-io/moment';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import PropTypes from 'prop-types';

import axios from 'axios';

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      categories: [
        'rent',
        'groceries',
        'transportation',
        'bills',
        'clothes',
        'going out',
        'household expenses'
      ],
      netBalance: 10000,
      accounts: ['checking', 'savings', 'Visa', 'AmEx'],
      inputAmount: 0,
      inputCategory: 'category',
      inputPayee: '',
      inputDate: new Date(),
      inputAccount: 'account',
      typeOfTransaction: ''
    };
    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    this.handleCategoryInput = this.handleCategoryInput.bind(this);
    this.handlePayeeInput = this.handlePayeeInput.bind(this);
    this.handleAccountInput = this.handleAccountInput.bind(this);
    this.handleAddTransaction = this.handleAddTransaction.bind(this);
    this.depositOrDebit = this.depositOrDebit.bind(this);
  }

  handleDateInput(value) {
    this.setState({
      inputDate: value
    });
  }

  handleAmountInput(value) {
    this.setState({
      inputAmount: value.target.value
    });
  }

  handleCategoryInput(event) {
    this.setState({
      inputCategory: event.target.value
    });
  }

  handleAccountInput(event) {
    let inputAccount = event.target.value;

    this.setState({
      inputAccount: inputAccount
    });
  }

  handlePayeeInput(value) {
    this.setState({
      inputPayee: value.target.value
    });
  }

  depositOrDebit(value) {
    console.log(value.target.value);
  }

  handleAddTransaction() {
    //write post request at app level
    let month = this.state.inputDate.getMonth();
    let year = this.state.inputDate.getFullYear();

    const data = {
      category: this.state.inputCategory,
      account: this.state.inputAccount,
      amount: Number(this.state.inputAmount),
      payee: this.state.inputPayee,
      date: this.state.inputDate.toString()
    };
  }
  render() {
    return (
      <div style={styles.root} className="dashboardPage">
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          <Paper style={{ width: '50%' }}>
            <Typography variant="h1" gutterBottom>
              Hello, {this.props.accountData.firstName}!
            </Typography>
            <Tooltip
              placement="top"
              title="Safe to spend balance: bank accounts less credit card debt"
            >
              <Typography variant="h2">
                You have ${this.state.netBalance} total
              </Typography>
            </Tooltip>
          </Paper>
          <Paper style={{ width: '50%' }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="h4">Add a transaction</Typography>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  variant="inline"
                  format="MM/DD/YYYY"
                  margin="normal"
                  value={this.state.inputDate}
                  onChange={this.handleDateInput}
                />
              </MuiPickersUtilsProvider>

              <TextField
                id="amount"
                label="amount"
                type="number"
                value={this.state.inputAmount}
                onChange={this.handleAmountInput}
                margin="normal"
              />
              <FormLabel component="legend">
                Is this a deposit or debit?{' '}
              </FormLabel>
              <RadioGroup
                aria-label="position"
                name="position"
                //value="deposit"
                onChange={this.depositOrDebit}
                row
              >
                <FormControlLabel
                  value="debit"
                  control={<Radio color="primary" />}
                  label="debit"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="deposit"
                  control={<Radio color="primary" />}
                  label="deposit"
                  labelPlacement="start"
                />
              </RadioGroup>
              <Select
                value={this.state.inputCategory}
                onChange={this.handleCategoryInput}
              >
                {this.state.categories.map((category, i) => {
                  return (
                    <MenuItem key={`categoryInput_${i}`} value={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              </Select>
              <Select
                value={this.state.inputAccount}
                onChange={this.handleAccountInput}
              >
                {this.state.accounts.map((account, i) => {
                  return (
                    <MenuItem key={`accountInput_${i}`} value={account}>
                      {account}
                    </MenuItem>
                  );
                })}
              </Select>
              <TextField
                id="payee"
                label="payee"
                value={this.state.inputPayee}
                onChange={this.handlePayeeInput}
                margin="normal"
              />
              <Button onClick={this.handleAddTransaction} color="primary">
                Add transaction
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1
  }
};

DashboardPage.propTypes = {
  accountData: PropTypes.object
};
