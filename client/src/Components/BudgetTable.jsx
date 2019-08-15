import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BudgetAllottment from './BudgetAllotment.jsx';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const translateMonths = {
  1: 'jan',
  2: 'feb',
  3: 'mar',
  4: 'apr',
  5: 'may',
  6: 'jun',
  7: 'jul',
  8: 'aug',
  9: 'sep',
  10: 'oct',
  11: 'nov',
  12: 'dec'
};

const BudgetTable = ({ curMonth, rows }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton aria-label="previous-month">
        <ChevronLeft />
      </IconButton>
      <Typography variant="button">{translateMonths[curMonth]}</Typography>
      <IconButton aria-label="next-month">
        <ChevronRight />
      </IconButton>
      <Grid container justify="center">
        <Grid item xs={12} xl={8}>
          <Paper className={classes.paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Allotted</TableCell>
                  <TableCell align="right">Spent</TableCell>
                  <TableCell align="right">Remaining</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.category}>
                    <TableCell component="th" scope="row">
                      {row.category}
                    </TableCell>
                    <TableCell align="right">
                      <BudgetAllottment allotment={row.allotted} />
                    </TableCell>
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
};

BudgetTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object)
};

export default BudgetTable;
