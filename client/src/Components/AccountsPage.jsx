import React from 'react';
import AccountsTable from './AccountsTable.jsx';
import AccountTransactions from './AccountTransactions.jsx';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

export default class AccountsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      accountType: '',
      accountFilter: ''
    };

    this.handleAddAccount = this.handleAddAccount.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAccountFilter = this.handleAccountFilter.bind(this);
  }

  handleAddAccount() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
    console.log(this.props.accountData.accounts);
  }

  handleSelect(event) {
    this.setState({ accountType: event.target.value });
  }

  handleAccountFilter(event) {
    this.setState({ accountFilter: event.target.value });
  }

  render() {
    const accountData = this.props.accountData;
    let data = [];
    let accountsList = [];
    if (
      accountData &&
      accountData.accounts[0] &&
      accountData.accounts[0].transactions &&
      accountData.accounts[0].transactions['2019'] &&
      accountData.accounts[0].transactions['2019']['8']
    ) {
      data = accountData.accounts[0].transactions['2019']['8'];
      data = data.sort((a, b) => b.date - a.date);
      accountsList = accountData.accounts;
      console.log('account list', accountsList);
      console.log('data is', data);
    }
    return (
      <div>
        <h1>Accounts</h1>
        <Grid container spacing={3}>
          <AccountsTable
            accountData={this.props.accountData}
            handleAddAccount={this.handleAddAccount}
            handleClose={this.handleClose}
            handleSelect={this.handleSelect}
            accountType={this.state.accountType}
            open={this.state.open}
          />
          <AccountTransactions
            data={data}
            accountsList={accountsList}
            accountFilter={this.state.accountFilter}
            handleAccountFilter={this.handleAccountFilter}
          />
        </Grid>
      </div>
    );
  }
}

AccountsPage.propTypes = {
  accountData: PropTypes.object
};
