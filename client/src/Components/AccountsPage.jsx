import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AccountsTable from './AccountsTable.jsx';
import AccountTransactions from './AccountTransactions.jsx';

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
    const { accountData } = this.props;
    let data = [];
    let accountsList = [];
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth().toString();
    let currentYear = currentDate.getFullYear().toString();
    if (
      accountData &&
      accountData.accounts[0] &&
      accountData.accounts[0].transactions &&
      accountData.accounts[0].transactions[currentYear] &&
      accountData.accounts[0].transactions[currentYear][currentMonth]
    ) {
      data = accountData.accounts[0].transactions[currentYear][currentMonth];
      data = data.sort((a, b) => b.date - a.date);
      accountsList = accountData.accounts;
      console.log('account list', accountsList);
      console.log(currentMonth, currentYear);
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
