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
import Loading from './Loading.jsx';
// import faker from 'faker';

class BudgetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: props.accounts,
      categories: props.categories,
      txsByMonth: {},
      categoryBreakdown: {},
      currentYear: 2019,
      currentMonth: 8,
      open: false,
      textInput: ''
    };
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleSaveCategory = this.handleSaveCategory.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.updateAllotments = this.updateAllotments.bind(this);
  }

  componentDidMount() {
    const { accounts, categories } = this.state;
    const txsByMonth = compileTxs(accounts);
    const categoryBreakdown = compileSpent(categories, txsByMonth);
    this.setState({ txsByMonth, categoryBreakdown });
  }

  // change current month
  handleMonthChange(increment) {
    const { currentMonth } = this.state;
    const newMonth = currentMonth + increment;
    if (newMonth > 0 && newMonth < 13) {
      this.setState({ currentMonth: newMonth });
    }
  }

  updateAllotments(name, val, year, month) {
    let { categories } = this.state;
    categories = categories ? categories : [];
    categories = JSON.parse(JSON.stringify(categories));

    categories.forEach(category => {
      if (
        category.name === name &&
        category.allotment &&
        category.allotment[year] &&
        category.allotment[year][month] !== undefined
      ) {
        category.allotment[year][month] = val;
      }
    });

    // TODO add function that sets app state
    console.log(categories);
  }

  handleAddCategory() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSaveCategory() {
    const { categories, textInput } = this.state;
    const categoryUpdate = JSON.parse(JSON.stringify(categories));
    // const newCategory = new Category(textInput);
    categoryUpdate.push(newCategory);

    console.log(
      'Updated categories after addition should be: ',
      categoryUpdate
    );
    this.props.handleUpdateCategories(categoryUpdate);
    this.handleClose();
  }

  handleDeleteCategory(deletedCategory) {
    const { categories } = this.state;
    const categoryUpdate = JSON.parse(JSON.stringify(categories)).filter(
      category => {
        return category.name !== deletedCategory;
      }
    );
    console.log(
      'Updated categories after deletion should be: ',
      categoryUpdate
    );
    this.props.handleUpdateCategories(categoryUpdate);
    this.handleClose();
  }

  handleTextInput(e) {
    const { value } = e.target;
    this.setState({
      textInput: value
    });
  }

  render() {
    this.updateAllotments('bills', 100, 2019, 8);
    const { loading, isAuthenticated } = this.props;
    if (loading || !isAuthenticated) {
      return (
        <div data-testid="auth-loading">
          <Loading />
        </div>
      );
    }

    const { currentMonth, currentYear, categoryBreakdown, open } = this.state;
    const breakdown =
      categoryBreakdown[currentYear] &&
      categoryBreakdown[currentYear][currentMonth]
        ? categoryBreakdown[currentYear][currentMonth]
        : [];
    return (
      <BudgetTable
        month={currentMonth}
        breakdown={breakdown}
        open={open}
        handleAddCategory={this.handleAddCategory}
        handleSaveCategory={this.handleSaveCategory}
        handleDeleteCategory={this.handleDeleteCategory}
        handleDeleteDialog={this.handleDeleteDialog}
        handleClose={this.handleClose}
        handleTextInput={this.handleTextInput}
        handleMonthChange={this.handleMonthChange}
      />
    );
  }
}

BudgetPage.propTypes = {
  allotments: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  transactions: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  updateAccountData: PropTypes.func,
  handleUpdateCategories: PropTypes.func
};

const totalSpent = txs => {
  const total = txs.reduce((total, { amount }) => total + Number(amount), 0);
  return Number.parseInt(total);
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
      result[year] = result[year] ? result[year] : {};
      // save off this year's months
      const months = Object.keys(transactions[year]);
      months.forEach(month => {
        const monthTxs = transactions[year][month];
        // setup month key in result year
        result[year][month] = result[year][month] ? result[year][month] : [];
        // safe to concat now
        result[year][month] = result[year][month].concat(monthTxs);
      });
    });
  });
  return result;
}

function compileSpent(categories = [], transactions) {
  const result = {};
  categories.forEach(category => {
    const { allotment, name } = category;
    const years = Object.keys(allotment);
    // add entry for this category for every year it existed
    years.forEach(year => {
      const months = Object.keys(allotment[year]);
      result[year] = result[year] ? result[year] : {};
      months.forEach(month => {
        const monthTxs = transactions[year][month];
        let spent = 0;
        result[year][month] = result[year][month] ? result[year][month] : {};
        monthTxs.forEach(tx => {
          if (tx.category === name) {
            spent += Number(tx.amount);
          }
        });
        result[year][month][name] = { alloted: 0, spent: spent.toFixed(2) };
      });
    });
  });
  return result;
}

// function Category(name) {
//   this.id = faker.random.uuid();
//   this.name = name;
//   this.allotment = { '2019': { '6': 0, '7': 0, '8': 0 } };
// }

export default BudgetPage;
