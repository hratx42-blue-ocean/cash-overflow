import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

const useStyles = makeStyles(() => {
  root: {
    flexGrow: 1;
  }
});

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountData: {},
      netBalance: 0,
      inputAmount: 0,
      inputCategory: '',
      inputPayee: '',
      inputDate: new Date()
    };
    this.handleDateInput = this.handleDateInput.bind(this);
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
  render() {
    const themes = useStyles();
    return (
      <div className={themes.root}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Paper>
            <Typography variant="h1" gutterBottom>
              Hello, {this.state.accountData.firstName}!
            </Typography>
            <Tooltip
              placement="bottom"
              title="Safe to spend balance: bank accounts less credit card debt"
            >
              <Typography variant="h2">
                You have ${this.state.netBalance} total
              </Typography>
            </Tooltip>
          </Paper>
          <Paper>
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
          </Paper>
        </Grid>
      </div>
    );
  }
}
