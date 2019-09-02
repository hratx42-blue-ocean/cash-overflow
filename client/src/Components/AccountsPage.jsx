import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Today from '@material-ui/icons/Today';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import Loading from './Loading';
import AccountTransactions from './AccountTransactions';
import AccountsTable from './AccountsTable';

import db from '../utils/databaseRequests';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    flexGrow: 1
  },
  jumbotron: {
    marginTop: '50px',
    textAlign: 'center'
  }
}));

const AccountsPage = ({
  user,
  accounts,
  accountTotalBal,
  transactions,
  targetDate,
  handleMonthChange,
  loading,
  isAuthenticated
}) => {
  const [open, setOpen] = useState(false);
  const [accountType, setAccountType] = useState('');
  const [accountFilter, setAccountFilter] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountTypeNames, setAccountTypeNames] = useState(undefined);

  const classes = useStyles();

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
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={5}
      >
        <Grid item xs={12} className={classes.jumbotron}>
          <Typography variant="h2" gutterBottom>
            {`Your activity for ${targetDate.format('MMMM, YYYY')}`}
          </Typography>
          <IconButton
            onClick={() => handleMonthChange(1)}
            aria-label="previous-month"
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={() => handleMonthChange()}
            aria-label="previous-month"
          >
            <Today />
          </IconButton>
          <IconButton
            onClick={() => handleMonthChange(-1)}
            aria-label="next-month"
          >
            <ChevronRight />
          </IconButton>
        </Grid>
        <Grid item sm={12} md={5}>
          <AccountsTable
            accounts={accounts}
            total={accountTotalBal}
            names={accountTypeNames}
          />
        </Grid>
        <Grid item sm={12} md={7}>
          <AccountTransactions
            transactions={transactions}
            targetDate={targetDate}
          />
        </Grid>
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
