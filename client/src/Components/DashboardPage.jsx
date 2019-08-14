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
      accounts: accounts,
      accountNames: accounts.map(account => account.name),
      inputAmount: undefined,
      inputCategory: 'category',
      inputPayee: '',
      inputDate: new Date()
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

  /**
   * Did not exist and was erroring on bind, I'm assuming it's for something but can't figure out what
   */
  findBalance(value) {
    console.log(
      'findBalance should do something with this in DashboardPage',
      value
    );
    this.setState({});
  }

  /**
   * Did not exist and was erroring on bind, I'm assuming it's for something but can't figure out what
   */
  depositOrDebit(value) {
    console.log(
      'depositOrDebit should do something with this in DashboardPage',
      value
    );
    this.setState({});
  }

  /**
   * Did not exist and was erroring on bind, I'm assuming it's for something but can't figure out what
   */
  handleAccountInput(value) {
    console.log(
      'Acount Input should do something with this in DashboardPage',
      value
    );
    this.setState({});
  }

  handleAmountInput(value) {
    let inputAmount = Number(value.target.value);
    this.setState({
      inputAmount: value
    });
  }

  handleCategoryInput(event) {
    this.setState({
      inputCategory: event.target.value
    });
  }

  handlePayeeInput(value) {
    this.setState({
      inputPayee: value
    });
  }

  render() {
    const { loading } = this.props;

    if (loading) {
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

DashboardPage.propTypes = {
  accountData: PropTypes.object,
  loading: PropTypes.bool.isRequired
};
