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
      accounts: props.accounts,
      categories: props.categories,
      txsByMonth: compileTxs(props.accounts),
      spentByCategory: compileSpent(props.categories)
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return <div>test</div>;
  }
}

BudgetPage.propTypes = {
  allotments: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  transactions: PropTypes.object
};

function compileTxs(accounts = []) {
  // accounts is an array of objects
  const result = {};
  // map through account objects
  accounts.forEach(account => {
    // save off array of years
    const { transactions } = account;
    const years = Object.keys(transactions);
    years.forEach(year => {
      // setup year key in result
      result[year] = result[year]
        ? result[year]
        : {};
      // save off this year's months
      const months = Object.keys(transactions[year]);
      months.forEach(month => {
        const monthTxs = transactions[year][month];
        // setup month key in result year
        result[year][month] = result[year][month]
          ? result[year][month]
          : [];
        // safe to concat now
        result[year][month] = result[year][month].concat(monthTxs);
      });
    });
  });
  return result;
}

function compileSpent(categories = []) {
  const result = {};
  categories.forEach(category => {
    console.log(category);
  });
  return result;
}

export default BudgetPage;
