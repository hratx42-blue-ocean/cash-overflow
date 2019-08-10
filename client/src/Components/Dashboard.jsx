import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountData: {},
      netBalance: 0,
      inputAmount: 0,
      inputCategory: '',
      inputPayee: ''
    };
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

  render() {
    return (
      <div>
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
        </Grid>
      </div>
    );
  }
}
