import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import format from '../../utils/formatCurrency';

const useStyles = makeStyles(theme => ({
  noTxs: {
    fontStyle: 'italic',
    textAlign: 'center'
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

const filterByDate = (transactions, targetDate) => {
  const targetYearMonth = targetDate.format('YYYY-MM');
  return transactions.filter(tx => {
    const { date } = tx;
    const [yearMonth] = date.match(/^(\d+-\d+)/g);
    return yearMonth === targetYearMonth;
  });
};

const AccountTransactions = ({
  handleOpenDialog,
  transactions,
  targetDate,
  setDialogTab
}) => {
  const classes = useStyles();
  const filteredTxs = filterByDate(transactions, targetDate);

  const noTxsMessage = txs => {
    if (txs.length === 0) {
      return (
        <div className={classes.noTxs}>
          No transactions match your criteria.
        </div>
      );
    }
    return '';
  };

  const handleOpenTransactionDialog = () => {
    setDialogTab(1);
    handleOpenDialog();
  };

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant="h5" align="center">
        Transactions
        <IconButton
          onClick={handleOpenTransactionDialog}
          aria-label="add-transaction"
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Typography>
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
            {filteredTxs.map(tx => {
              const { id, account, date, amount, category, memo } = tx;
              return (
                <TableRow color="hoverColor" key={`txRow-${id}`}>
                  <TableCell key={`txDate-${id}`}>
                    {moment(date).format('MMM D')}
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
      {noTxsMessage(filteredTxs)}
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
