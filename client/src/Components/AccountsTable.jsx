import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
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
import { makeStyles } from '@material-ui/styles';

import format from '../utils/formatCurrency';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  paper: {
    height: '100%',
    padding: theme.spacing(1)
  },
  title: {
    paddingTop: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem'
  }
}));

const AccountsTable = ({ accounts, names, total }) => {
  const classes = useStyles();
  // human readable account type, prevents crash if names haven't arrived yet
  const mapName = type => {
    if (names === undefined) {
      return 'Account';
    }
    return names[type].name;
  };

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h5" align="center">
        Accounts
        <IconButton aria-label="add-account">
          <AddIcon fontSize="small" />
        </IconButton>
      </Typography>
      <List>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map(account => {
              const { id, name, type, balance } = account;
              return (
                <TableRow key={`account-${id}`}>
                  <TableCell key={`name-${id}`}>{name}</TableCell>
                  <TableCell key={`type-${id}`}>{mapName(type)}</TableCell>
                  <TableCell key={`bal-${id}`} align="right">
                    {format(balance)}
                  </TableCell>
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
      </List>
    </Paper>
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
