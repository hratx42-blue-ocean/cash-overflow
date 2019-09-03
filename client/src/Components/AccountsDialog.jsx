import React, { useState } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AccountDialog = ({ handleOpenDialog, open }) => {
  // account state
  const [accountType, setAccountType] = useState('');
  const [accountName, setAccountName] = useState('');
  // transaction state
  const [txAccount, setTxAccount] = useState('');
  const [txAccountId, setTxAccountId] = useState(undefined);
  const [txAmount, setTxAmount] = useState('');
  const [txCategory, setTxCategory] = useState('');
  const [txCategoryId, setTxCategoryId] = useState(undefined);
  const [txDate, setTxDate] = useState(moment().format('YYYY-MM-DD'));
  const [txMemo, setTxMemo] = useState('');
  const [txType, setTxType] = useState(undefined);

  const clearTransactionInput = () => {
    setTxAccount('');
    setTxAccountId(undefined);
    setTxAmount('');
    setTxCategory('');
    setTxCategoryId(undefined);
    setTxDate(moment().format('YYYY-MM-DD'));
    setTxMemo('');
    setTxType(undefined);
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

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleOpenDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOpenDialog} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountDialog;
