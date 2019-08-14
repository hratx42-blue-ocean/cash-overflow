import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 350,
  },
}));

const totalSpent = (txs) => {
  const total = txs.reduce((total, { amount }) => total + Number(amount), 0);
  return Number.parseInt(total);
};

const curYear = 2019;
const curMonth = 8;

export default function BudgetPage({
  allotments = [],
  categories = [],
  transactions = {},
}) {
  const classes = useStyles();
  const mapped = {};
  const alloted = {};
  const rows = [];

  categories.forEach(({ name }) => (mapped[name] = []));
  if (
    transactions
    && transactions[curYear]
    && transactions[curYear][curMonth]
  ) {
    transactions[curYear][curMonth].forEach((transaction) => mapped[transaction.category].push(transaction));

    allotments.forEach((allotment) => {
      alloted[allotment.name] = allotment.allotment[curYear][curMonth];
    });

    Object.keys(mapped).forEach((key) => {
      const val = {};
      val.category = key;
      val.allotted = alloted[key];
      val.spent = totalSpent(mapped[key]);
      val.remaining = val.allotted - val.spent;
      val.transactions = mapped[key];
      rows.push(val);
    });
  }
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={1}>
        <Grid item xs={12} xl={8}>
          <Paper className={classes.paper}>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Allotted</TableCell>
                  <TableCell align="right">Spent</TableCell>
                  <TableCell align="right">Remaining</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.category}>
                    <TableCell component="th" scope="row">
                      {row.category}
                    </TableCell>
                    <TableCell align="right">{row.allotted}</TableCell>
                    <TableCell align="right">{row.spent}</TableCell>
                    <TableCell align="right">{row.remaining}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

BudgetPage.propTypes = {
  allotments: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  transactions: PropTypes.object,
<<<<<<< HEAD
  updateAccountData: PropTypes.func
=======
>>>>>>> 819123f38b07bbdd7ae2abe5a7a8fb39194962a0
};
