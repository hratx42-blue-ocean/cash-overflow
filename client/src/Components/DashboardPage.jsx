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
import FormLabel from '@material-ui/core/FormLabel';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import Loading from './Loading.jsx';

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    const { accountData } = this.props;
    const {
      firstName,
      lastName,
      email,
      budgetCategories,
      accounts
    } = accountData;

    this.state = {
      firstName,
      lastName,
      email,
      categories: budgetCategories,
      netBalance: 10000,
      accounts,
      accountNames: accounts.map(account => account.name),
      inputAmount: undefined,
      inputCategory: 'category',
      inputPayee: '',
      inputDate: moment(),
      inputAccount: 'account',
      typeOfTransaction: ''
    };
    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    this.handleCategoryInput = this.handleCategoryInput.bind(this);
    this.handlePayeeInput = this.handlePayeeInput.bind(this);
    this.handleAccountInput = this.handleAccountInput.bind(this);
    this.depositOrDebit = this.depositOrDebit.bind(this);
    this.findBalance = this.findBalance.bind(this);
  }

  handleDateInput(value) {
    this.setState({
      inputDate: value
    });
  }

  handleAmountInput(value) {
    const inputAmount = Number(value.target.value);
    this.setState({
      inputAmount
    });
  }

  handleCategoryInput(event) {
    this.setState({
      inputCategory: event.target.value
    });
  }

  handleAccountInput(event) {
    const inputAccount = event.target.value;

    this.setState({
      inputAccount
    });
  }

  handlePayeeInput(value) {
    this.setState({
      inputPayee: value.target.value
    });
  }

  depositOrDebit(value) {
    const typeOfTransaction = value.target.value;
    if (typeOfTransaction === 'debit') {
      this.setState({
        typeOfTransaction,
        inputAmount: -this.state.inputAmount
      });
    } else {
      this.setState({ typeOfTransaction });
    }
  }

  findBalance() {
    const today = new Date();
    // todays year
    const year = today.getFullYear();
    // todays month
    const month = today.getMonth();
    // months allotment
    let totalBudget = 0;
    // currently spent
    let currentlySpent = 0;
    // for each budgetCategory
    this.state.categories.forEach(category => {
      // find allotment at year and month

      totalBudget += category.allotment[year][month];
      // add to months allotment
    });
    // for each account
    this.state.accounts.forEach(account => {
      // at account at year and month
      account.transactions[year][month].forEach(transaction => {
        currentlySpent += Number(transaction.amount);
      });
      // go through each and add ammount to currently spent
    });

    return (totalBudget - currentlySpent).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  render() {
    const { loading, isAuthenticated } = this.props;

    if (loading || !isAuthenticated) {
      return (
        <div className="dashboardPage">
          <Loading />
        </div>
      );
    }

    return (
      <div style={styles.root} className="dashboardPage">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Paper
            style={{
              width: '40%',
              height: 150,
              margin: 20,
              padding: 25
            }}
          >
            <Typography
              style={{ textAlign: 'center' }}
              variant="h3"
              gutterBottom
            >
              Hello, {this.state.firstName}!
            </Typography>
            <Tooltip
              placement="top"
              title="Safe to spend balance: bank accounts less credit card debt"
            >
              <Typography style={{ textAlign: 'center' }} variant="h5">
                You have {this.findBalance()} total
              </Typography>
            </Tooltip>
          </Paper>
          <Paper style={{ width: '40%', margin: 20, padding: 15 }}>
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
                // value="deposit"
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
                    <MenuItem key={`categoryInput_${i}`} value={category.name}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <Select
                value={this.state.inputAccount}
                onChange={this.handleAccountInput}
              >
                {this.state.accountNames.map((account, i) => {
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
              <Button
                onClick={() => this.props.handleAddTransaction(this.state)}
                color="primary"
              >
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

DashboardPage.defaultProps = {
  accountData: {
    email: 'asdf@asdf.com',
    firstName: 'lsdkfj',
    lastName: 'lkdasjf'
  }
};

DashboardPage.propTypes = {
  accountData: PropTypes.object,
  handleAddTransaction: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  updateAccountData: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired
};
