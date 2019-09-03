import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MomentUtils from '@date-io/moment';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
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

const AccountsDialog = ({
  user,
  accounts,
  categories,
  accountTypes,
  accountTypeNames,
  handleOpenDialog,
  pushNewItem,
  open,
  dialogTab,
  setDialogTab
}) => {
  console.log('accounts are', accounts);
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
  const [txDate, setTxDate] = useState(moment());
  const [txMemo, setTxMemo] = useState('');
  const [txType, setTxType] = useState(1);

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
    setTxType(1);
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

  const handleNewTransaction = () => {
    console.log(txDate && txMemo && txAmount && txAccountId && txCategoryId);
    console.log(txDate, txMemo, txAmount, txAccountId, txCategoryId);
    if (txDate && txMemo && txAmount && txAccountId && txCategoryId) {
      const txRecurring = 0;
      const txUser = user.id;
      const tx = {
        id: Math.random(),
        account: txAccountId,
        amount: txAmount,
        category: txCategoryId,
        date: txDate.format('YYYY-MM-DD'),
        memo: txMemo,
        recurring: 0,
        type: txType,
        user: user.id
      };
      pushNewItem('transactions', tx);
      db.postTransaction(
        txAccountId,
        txAmount,
        txCategoryId,
        txDate.format('YYYY-MM-DD'),
        txMemo,
        txRecurring,
        txType,
        txUser
      );
      handleClearAll();
      handleOpenDialog();
    }
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
          value={accountName}
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
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            className={classes.margin}
            variant="inline"
            format="YYYY/MM/DD"
            margin="normal"
            value={txDate}
            onChange={setTxDate}
          />
        </MuiPickersUtilsProvider>
        <TextField
          className={classes.fullwidth}
          id="tx-memo"
          label="Transaction Memo"
          onChange={e => setTxMemo(e.target.value)}
          value={txMemo}
        />
        <TextField
          className={classes.margin}
          id="tx-amount"
          label="Amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          onChange={e => setTxAmount(Number(e.target.value))}
          value={txAmount}
        />
        <TextField
          select
          className={classes.dropdown}
          label="Account"
          onChange={e => setTxAccountId(Number(e.target.value))}
          value={txAccountId}
        >
          {accounts.map(account => (
            <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          className={classes.dropdown}
          label="Budget Category"
          onChange={e => setTxCategoryId(Number(e.target.value))}
          value={txCategoryId}
        >
          {categories.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <RadioGroup
          aria-label="tx-type"
          name="txType"
          onChange={e => setTxType(Number(e.target.value))}
          row
          value={txType}
        >
          <FormControlLabel
            value={1}
            control={<Radio color="primary" />}
            label="outflow"
            labelPlacement="start"
          />
          <FormControlLabel
            value={2}
            control={<Radio color="primary" />}
            label="inflow"
            labelPlacement="start"
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClearAll} color="primary">
          Cancel
        </Button>
        <Button onClick={handleNewTransaction} color="primary">
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

export default AccountsDialog;
