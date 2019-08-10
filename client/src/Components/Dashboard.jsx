import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MomentUtils from '@date-io/moment';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountData: {},
      categories: [
        'rent',
        'groceries',
        'transportation',
        'bills',
        'clothes',
        'going out',
        'household expenses'
      ],
      netBalance: 0,
      inputAmount: 0,
      inputCategory: '',
      inputPayee: '',
      inputDate: new Date()
    };
    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleAmountInput = this.handleAmountInput.bind(this);
    this.handleCategoryInput = this.handleCategoryInput.bind(this);
  }

  componentDidMount() {
    this.setState({
      accountData: {
        firstName: 'Chad',
        lastName: 'Cramer'
      },
      netBalance: 1000
    });
  }

  handleDateInput(value) {
    this.setState({
      inputDate: value
    });
  }

  handleAmountInput(value) {
    this.setState({
      inputAmount: value
    });
  }

  handleCategoryInput(value) {
    this.setState({
      inputCategory: value
    });
  }

  render() {
    return (
      <div style={styles.root}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Paper>
            <Typography variant="h1" gutterBottom>
              Hello, {this.state.accountData.firstName}!
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
          <Paper>
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
                value={this.state.inputAmount}
                onChange={this.handleAmountInput}
                margin="normal"
              />
              <Select
                value={this.state.inputCategory}
                onChange={this.handleCategoryInput}
                inputProps={{
                  name: 'category'
                }}
              >
                {this.state.categories.map((category, i) => {
                  return (
                    <MenuItem key={`categoryInput_${i}`} value={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              </Select>
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
