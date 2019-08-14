import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import BudgetTable from './BudgetTable.jsx';

const totalSpent = txs => {
  const total = txs.reduce((total, { amount }) => total + Number(amount), 0);
  return Number.parseInt(total);
};

class BudgetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allotments: props.allotments || [],
      categories: props.categories || [],
      curMonth: 7,
      curYear: 2019,
      rows: [],
      transactions: props.transactions || {}
    };
  }

  render() {
    const {
      allotments,
      categories,
      curMonth,
      curYear,
      transactions
    } = this.state;

    const mapped = {};
    const allotted = {};
    const rows = [];
    categories.forEach(({ name }) => (mapped[name] = []));
    if (
      transactions &&
      transactions[curYear] &&
      transactions[curYear][curMonth]
    ) {
      transactions[curYear][curMonth].forEach(transaction => {
        mapped[transaction.category].push(transaction);
      });

      allotments.forEach(allotment => {
        allotted[allotment.name] = allotment.allotment[curYear][curMonth];
      });

      Object.keys(mapped).forEach(key => {
        const val = {};
        val.category = key;
        val.allotted = allotted[key];
        val.spent = totalSpent(mapped[key]);
        val.remaining = val.allotted - val.spent;
        val.transactions = mapped[key];
        rows.push(val);
      });
    }

    return <BudgetTable rows={rows} />;
  }
}

BudgetPage.propTypes = {
  allotments: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  transactions: PropTypes.object
};

export default BudgetPage;
