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
            <Typography variant="h1">
              Hello, {this.state.accountData.firstName}!
            </Typography>
          </Paper>
        </Grid>
      </div>
    );
  }
}
