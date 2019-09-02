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
import { positions } from '@material-ui/system';
import Loading from './Loading.jsx';
import AlertBox from './AlertBox.jsx';
import { Auth0Context } from '../react-auth0-wrapper';

import format from '../utils/formatCurrency';

const styles = {
  root: {
    flexGrow: 1
  }
};

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.accounts = props.accounts;
    this.categories = props.categories;
    this.transactions = props.transactions;

    this.state = {
      txAccount: '',
      txAccountId: undefined,
      txAmount: undefined,
      txCategory: undefined,
      txCategoryId: '',
      txDate: moment(),
      txMemo: '',
      txType: ''
    };
    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    this.handleCategoryInput = this.handleCategoryInput.bind(this);
    this.handleMemoInput = this.handleMemoInput.bind(this);
    this.handleAccountInput = this.handleAccountInput.bind(this);
    this.handleTransactionType = this.handleTransactionType.bind(this);
    this.findBalance = this.findBalance.bind(this);
    this.handleSubmitTransaction = this.handleSubmitTransaction.bind(this);
  }

  handleAccountInput(event) {
    const txAccount = event.target.value;
    const txAccountId = Number(
      event.nativeEvent.target.getAttribute('recordid')
    );
    this.setState({ txAccount, txAccountId });
  }

  handleAmountInput(event) {
    const txAmount = Number(event.target.value);
    this.setState({ txAmount });
  }

  handleCategoryInput(event) {
    const txCategory = event.target.value;
    const txCategoryId = Number(
      event.nativeEvent.target.getAttribute('recordid')
    );
    this.setState({ txCategory, txCategoryId });
  }

  handleDateInput(event) {
    this.setState({ txDate: event });
  }

  handleMemoInput(event) {
    const txMemo = event.target.value;
    this.setState({ txMemo });
  }

  handleTransactionType(event) {
    const txType = event.target.value;
    if (txType === 'outflow') {
      // debit
      this.setState({ txType: 1 });
    } else {
      // credit
      this.setState({ txType: 2 });
    }
  }

  clearTransactionInput() {
    this.setState({
      txAccount: '',
      txAccountId: undefined,
      txAmount: undefined,
      txCategory: undefined,
      txCategoryId: '',
      txDate: moment(),
      txMemo: '',
      txType: ''
    });
  }

  findBalance() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    let totalBudget = 0;
    let currentlySpent = 0;

    const { categories } = this.state;
    categories
      .filter(category => {
        if (category.allotment[year]) {
          if (category.allotment[year][month]) {
            return true;
          }
        }
      })
      .forEach(category => {
        totalBudget += category.allotment[year][month];
      });

    const { accounts } = this.state;
    accounts.forEach(account => {
      account.transactions[year][month].forEach(transaction => {
        currentlySpent += Number(transaction.amount);
      });
    });

    return (totalBudget - currentlySpent).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  // TODO: RFC refactor
  calculateTotalBalance() {
    return this.accounts.reduce((sum, account) => {
      // only adds balances for accounts of type checking or savings
      if (account.type !== 3) {
        return sum + account.balance;
      }
      return sum;
    }, 0);
  }

  handleSubmitTransaction() {
    console.log('state is', this.state);
  }

  render() {
    const { loading, isAuthenticated } = this.props;

    if (loading || !isAuthenticated) {
      return (
        <div data-testid="auth-loading">
          <Loading />
        </div>
      );
    }

    return (
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          style={{ padding: 20 }}
        >
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="flex-start"
            style={{ width: '40%', margin: 20 }}
          >
            <Paper
              style={{
                width: '100%',
                height: 150,
                marginBottom: 20,
                padding: 25
              }}
            >
              <Typography
                style={{ textAlign: 'center' }}
                variant="h3"
                gutterBottom
              >
                Hello, {this.user.first_name}!
                <Tooltip
                  placement="top"
                  title="Safe to spend balance: bank accounts less credit card debt"
                >
                  <Typography style={{ textAlign: 'center' }} variant="h5">
                    You have {format(this.calculateTotalBalance())} total
                  </Typography>
                </Tooltip>
              </Typography>
            </Paper>
          </Grid>

          <Paper style={{ width: '40%', margin: 20, padding: 25 }}>
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
                  value={this.state.txDate}
                  onChange={this.handleDateInput}
                />
              </MuiPickersUtilsProvider>

              <TextField
                id="amount"
                label="amount"
                type="number"
                value={this.state.txAmount}
                onChange={this.handleAmountInput}
                margin="normal"
              />
              <FormLabel component="legend">
                Is this an outflow or inflow?{' '}
              </FormLabel>
              <RadioGroup
                aria-label="position"
                name="position"
                onChange={this.handleTransactionType}
                row
              >
                <FormControlLabel
                  value="outflow"
                  control={<Radio color="primary" />}
                  label="outflow"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="inflow"
                  control={<Radio color="primary" />}
                  label="inflow"
                  labelPlacement="start"
                />
              </RadioGroup>
              <Select
                value={this.state.txCategory}
                onChange={this.handleCategoryInput}
              >
                {this.categories.map(category => {
                  const { id, name } = category;
                  return (
                    <MenuItem key={id} recordid={id} value={name}>
                      {name}
                    </MenuItem>
                  );
                })}
              </Select>
              <Select
                value={this.state.txAccount}
                onChange={this.handleAccountInput}
              >
                {this.accounts.map(account => {
                  const { id, name } = account;
                  return (
                    <MenuItem key={id} recordid={id} value={name}>
                      {name}
                    </MenuItem>
                  );
                })}
              </Select>
              <TextField
                id="payee"
                label="payee"
                value={this.state.txMemo}
                onChange={this.handleMemoInput}
                margin="normal"
              />
              <Button onClick={this.handleSubmitTransaction} color="primary">
                Add transaction
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </div>
    );
  }
}

DashboardPage.defaultProps = {
  accountData: {
    email: 'asdf@asdf.com',
    firstName: 'lsdkfj',
    lastName: 'lkdasjf'
  }
};

DashboardPage.propTypes = {
  accountData: PropTypes.object.isRequired,
  handleAddTransaction: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  updateAccountData: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired
};

DashboardPage.contextType = {
  Auth0Context: PropTypes.object.isRequired
};

DashboardPage.contextType = Auth0Context;
