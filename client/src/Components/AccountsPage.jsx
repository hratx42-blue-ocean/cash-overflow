import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { kMaxLength } from 'buffer';
import AccountsTable from './AccountsTable';
import AccountTransactions from './AccountTransactions';
import Loading from './Loading';

import db from '../utils/databaseRequests';

const AccountsPage = ({
  user,
  accounts,
  accountTotalBal,
  transactions,
  targetDate,
  loading,
  isAuthenticated
}) => {
  const [open, setOpen] = useState(false);
  const [accountType, setAccountType] = useState('');
  const [accountFilter, setAccountFilter] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountTypeNames, setAccountTypeNames] = useState(undefined);

  // on mount, get account type names and map for lookup
  useEffect(() => {
    if (accountTypeNames === undefined) {
      db.getUserAccountTypes()
        .then(({ data }) => {
          const mapped = {};
          data.forEach(type => {
            mapped[type.id] = type;
          });
          return mapped;
        })
        .then(mapped => {
          setAccountTypeNames(mapped);
        })
        .catch(console.error);
    }
  });

  // handleAddAccount() {
  //   this.setState({ open: true });
  // }

  // handleAccountNameInput(event) {
  //   this.setState({ accountName: event.target.value });
  // }

  // handleClose() {
  //   this.setState({ open: false });
  //   console.log(this.props.accountData.accounts);
  // }

  // handleSelect(event) {
  //   this.setState({ accountType: event.target.value });
  // }

  // handleAccountFilter(event) {
  //   this.setState({ accountFilter: event.target.value });
  // }

  // handleLeftArrow() {
  //   if (this.state.currentMonth > 1) {
  //     this.setState({ currentMonth: this.state.currentMonth - 1 }, () =>
  //       console.log(this.state.currentMonth)
  //     );
  //   }
  // }

  // handleRightArrow() {
  //   if (this.state.currentMonth < 12) {
  //     this.setState({ currentMonth: this.state.currentMonth + 1 }, () =>
  //       console.log(this.state.currentMonth)
  //     );
  //   }
  // }

  if (loading || !isAuthenticated) {
    return (
      <div data-testid="auth-loading">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={3}>
        <AccountsTable
          accounts={accounts}
          total={accountTotalBal}
          names={accountTypeNames}
        />
        <AccountTransactions
          transactions={transactions}
          targetDate={targetDate}
        />
      </Grid>
    </div>
  );
};

AccountsPage.propTypes = {
  accountData: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default AccountsPage;
