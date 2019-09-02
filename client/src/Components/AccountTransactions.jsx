import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import format from '../utils/formatCurrency';

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    padding: theme.spacing(1)
  }
}));

const AccountTransactions = ({ transactions, targetDate }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <List>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Memo</TableCell>
              <TableCell>Account</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(tx => {
              const { id, account, date, amount, category, memo } = tx;
              return (
                <TableRow color="hoverColor" key={`txRow-${id}`}>
                  <TableCell key={`txDate-${id}`}>
                    {new Date(date).toLocaleDateString('en-US')}
                  </TableCell>
                  <TableCell key={`txPayee-${id}`}>{memo}</TableCell>
                  <TableCell key={`txAccount-${id}`}>{account}</TableCell>
                  <TableCell key={`txAmount-${id}`} align="right">
                    {format(amount)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </List>
    </Paper>
  );
};

AccountTransactions.propTypes = {
  data: PropTypes.array,
  accountFilter: PropTypes.string,
  handleAccountFilter: PropTypes.func,
  accountsList: PropTypes.array
};

export default AccountTransactions;
