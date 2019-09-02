import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

import format from '../utils/formatCurrency';

const AccountsTable = ({ accounts, names, total }) => {
  // human readable account type, prevents crash if names haven't arrived yet
  const mapName = type => {
    if (names === undefined) {
      return 'Account';
    }
    return names[type].name;
  };

  return (
    <Grid item xs={4} style={{ paddingTop: '100px' }}>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key="account" align="center">
                Account
              </TableCell>
              <TableCell key="type" align="center">
                Type
              </TableCell>
              <TableCell key="balance" align="center">
                Balance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map(account => {
              const { id, name, type, balance } = account;
              return (
                <TableRow key={`account-${id}`}>
                  <TableCell key={`name-${id}`}>{name}</TableCell>
                  <TableCell key={`type-${id}`}>{mapName(type)}</TableCell>
                  <TableCell key={`bal-${id}`}>{format(balance)}</TableCell>
                </TableRow>
              );
            })}
            <TableRow key="total">
              <TableCell key="blank-1" />
              <TableCell key="total">Total:</TableCell>
              <TableCell key="total-amount">{format(total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Chip
        avatar={
          <Avatar>
            <AddIcon />
          </Avatar>
        }
        label="Add an account"
        color="primary"
        variant="outlined"
        style={{ marginTop: '20px' }}
      />
      {/* <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the account you wish to add:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Account Name"
            fullWidth
            onChange={props.handleAccountNameInput}
          />

          <FormControl style={{ minWidth: '100%' }}>
            <InputLabel htmlFor="account-type">Account Type</InputLabel>
            <Select
              value={props.accountType}
              onChange={props.handleSelect}
              input={<Input id="account-type" />}
            >
              <MenuItem key="accountSelect_1" value="Checkings">
                Checking
              </MenuItem>
              <MenuItem key="accountSelect_2" value="Savings">
                Savings
              </MenuItem>
              <MenuItem key="accountSelect_3" value="Credit">
                Credit
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleSaveAccount} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog> */}
    </Grid>
  );
};

AccountsTable.defaultProps = {
  accounts: []
};

AccountsTable.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
  names: PropTypes.objectOf(PropTypes.object).isRequired,
  total: PropTypes.number.isRequired
};

export default AccountsTable;
