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
      allotments: props.allotments,
      categories: props.categories,
      transactions: props.transactions,
      curYear: 2019,
      rows: [],
      mapped: mapCategories(this.categories),
      months: listMonths(this.transactions),
      curMonth: getCurrentMonth(this.months)
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    // begin front end calculation
    const { allotments, categories, curYear, transactions } = this.state;
    const mapped = {};
    const allotted = {};
    const rows = [];
    let months;
    let curMonth;
    if (
      transactions &&
      transactions[curYear] &&
      Object.keys(transactions[curYear]).length > 2
    ) {
      curMonth = months[months.length - 1];

      transactions[curYear][curMonth].forEach(transaction => {
        mapped[transaction.category].push(transaction);
      });

      allotments.forEach(allotment => {
        allotted[allotment.name] = allotment.allotment[curYear][cuÎrMonth];
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
    // end calculation

    return <BudgetTable rows={rows} curMonth={curMonth} months={months} />;
  }
}

BudgetPage.propTypes = {
  allotments: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  transactions: PropTypes.object
};

// calculation functions
function mapCategories(categories = []) {
  console.log('mapCats called with', categories);
  const mapped = {};
  categories.forEach(({ name }) => (mapped[name] = []));
  return mapped;
}

function listMonths(transactions = {}) {
  return Object.keys(Object.values(transactions)[0]);
}

function getCurrentMonth(months = []) {
  return months.slice().pop();
}

export default BudgetPage;
