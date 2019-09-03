import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import db from '../utils/databaseRequests';

const useStyles = makeStyles(theme => ({
  dropdown: {
    margin: '1rem',
    width: '150px'
  },
  fullwidth: {
    margin: '1rem',
    width: '85%'
  },
  margin: {
    margin: '1rem'
  }
}));

const AccountDialog = ({
  user,
  accountTypes,
  accountTypeNames,
  handleOpenDialog,
  pushNewItem,
  open,
  dialogTab,
  setDialogTab
}) => {
  // account state
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [accountType, setAccountType] = useState(undefined);
  // transaction state
  const [txAccount, setTxAccount] = useState('');
  const [txAccountId, setTxAccountId] = useState(undefined);
  const [txAmount, setTxAmount] = useState('');
  const [txCategory, setTxCategory] = useState('');
  const [txCategoryId, setTxCategoryId] = useState(undefined);
  const [txDate, setTxDate] = useState(moment().format('YYYY-MM-DD'));
  const [txMemo, setTxMemo] = useState('');
  const [txType, setTxType] = useState(undefined);

  const classes = useStyles();

  const handleClearAll = () => {
    handleOpenDialog();
    setAccountName('');
    setAccountBalance('');
    setAccountType(undefined);
    setTxAccount('');
    setTxAccountId(undefined);
    setTxAmount('');
    setTxCategory('');
    setTxCategoryId(undefined);
    setTxDate(moment().format('YYYY-MM-DD'));
    setTxMemo('');
    setTxType(undefined);
  };

  const handleAccountTypeChange = e => {
    setAccountType(e.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setDialogTab(newValue);
  };

  const handleNewAccount = () => {
    if (accountName && accountBalance && accountType) {
      const account = {
        id: Math.random(),
        name: accountName,
        balance: accountBalance,
        type: accountType,
        user: user.id
      };
      pushNewItem('accounts', account);
      db.postAccount(accountName, accountBalance, accountType, user.id);
      handleClearAll();
      handleOpenDialog();
    }
  };

  const handleSubmitTransaction = () => {
    const txRecurring = 0;
    const txUser = user.id;

    db.postTransaction(
      txAccountId,
      txAmount,
      txCategoryId,
      txDate,
      txMemo,
      txRecurring,
      txType,
      txUser
    )
      .then(() => clearTransactionInput())
      .catch(console.error);
  };

  // account tab, not separate component because we're too deep
  const accountTab = (
    <>
      <DialogTitle id="form-dialog-title">Add new account</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.fullwidth}
          id="account-name"
          label="Account Name"
          onChange={e => setAccountName(e.target.value)}
        />
        <TextField
          className={classes.margin}
          id="account-balance"
          helperText="Account's balance as of now"
          label="Balance"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          onChange={e => setAccountBalance(Number(e.target.value))}
          value={accountBalance}
        />
        <TextField
          select
          className={classes.dropdown}
          label="Type"
          onChange={handleAccountTypeChange}
          value={accountType}
        >
          {accountTypes.map(account => (
            <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClearAll} color="primary">
          Cancel
        </Button>
        <Button onClick={handleNewAccount} color="primary">
          Add
        </Button>
      </DialogActions>
    </>
  );

  // tx tab, not separate component because we're too deep
  const txTab = (
    <>
      <DialogTitle id="form-dialog-title">Add new transaction</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.fullwidth}
          id="account-name"
          label="Account Name"
          onChange={e => setAccountName(e.target.value)}
        />
        <TextField
          className={classes.margin}
          id="account-balance"
          helperText="Account's balance as of now"
          label="Balance"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          onChange={e => setAccountBalance(Number(e.target.value))}
          value={accountBalance}
        />
        <TextField
          select
          className={classes.dropdown}
          label="Type"
          onChange={handleAccountTypeChange}
          value={accountType}
        >
          {accountTypes.map(account => (
            <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClearAll} color="primary">
          Cancel
        </Button>
        <Button onClick={handleNewAccount} color="primary">
          Add
        </Button>
      </DialogActions>
    </>
  );

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleOpenDialog}
        aria-labelledby="form-dialog-title"
      >
        <AppBar position="static">
          <Tabs value={dialogTab} onChange={handleTabChange} aria-label="tabs">
            <Tab label="Account" />
            <Tab label="Transaction" />
          </Tabs>
        </AppBar>
        {dialogTab === 0 ? accountTab : txTab}
      </Dialog>
    </div>
  );
};

export default AccountDialog;
