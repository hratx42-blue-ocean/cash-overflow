import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
            <Typography variant="h2">
              You have ${this.state.netBalance} total
            </Typography>
            <Typography variant="subtitle1">
              This is your "safe to spend" balance, reflecting your bank
              accounts less any credit card debt
            </Typography>
          </Paper>
        </Grid>
      </div>
    );
  }
}
