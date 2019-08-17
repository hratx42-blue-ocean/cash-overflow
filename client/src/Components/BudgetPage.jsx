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
import faker from 'faker';

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
      textInput: '',
      counter: props.counter
    };
    this.handleUpdateCategories = props.handleUpdateCategories;

    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleSaveCategory = this.handleSaveCategory.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.recalculate = this.recalculate.bind(this);
    this.updateAllotments = this.updateAllotments.bind(this);
  }

  componentDidMount() {
    console.log('component did mount');
    this.recalculate(this.state.categories);
  }

  componentDidUpdate() {
    // const { categories: propCatagories } = this.props;
    // const { categories: stateCatagories } = this.state;
    // if (JSON.stringify(propCatagories) !== JSON.stringify(stateCatagories)) {
    //   this.recalculate();
    // }
  }

  // change current month
  handleMonthChange(increment) {
    const { currentMonth } = this.state;
    const newMonth = currentMonth + increment;
    if (newMonth > 0 && newMonth < 13) {
      this.setState({ currentMonth: newMonth });
    }
  }

  async updateAllotments(name, val) {
    let { categories, currentMonth, currentYear } = this.state;
    categories = categories || [];
    categories = JSON.parse(JSON.stringify(categories));

    categories.forEach(category => {
      if (
        category.name === name &&
        category.allotment &&
        category.allotment[currentYear] &&
        category.allotment[currentYear][currentMonth] !== undefined
      ) {
        category.allotment[currentYear][currentMonth] = val;
      }
    });

    // TODO make this async?
    await this.props.asyncHandleUpdateCategories(categories, this.recalculate);
  }

  handleAddCategory() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSaveCategory() {
    const categoryUpdate = this.state.categories.slice();
    const newCategory = new Category(this.state.textInput);
    categoryUpdate.push(newCategory);
    this.props.handleUpdateCategories(categoryUpdate);
    this.handleClose();
  }

  handleTextInput(e) {
    const { value } = e.target;
    this.setState({
      textInput: value
    });
  }

  recalculate(categories) {
    const { accounts } = this.state;
    const txsByMonth = compileTxs(accounts);
    const categoryBreakdown = compileSpent(categories, txsByMonth);
    console.log('recalculate thinks state is: ', this.state);
    console.log('recalculate thinks its categories are: ', categoryBreakdown);
    this.setState({ txsByMonth, categoryBreakdown });
  }

  render() {
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
        year={currentYear}
        breakdown={breakdown}
        handleMonthChange={this.handleMonthChange}
        updateAllotments={this.updateAllotments}
        open={open}
        handleAddCategory={this.handleAddCategory}
        handleSaveCategory={this.handleSaveCategory}
        handleClose={this.handleClose}
        handleTextInput={this.handleTextInput}
        recalculate={this.recalculate}
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
        const allotted =
          category.allotment !== undefined &&
          category.allotment[year] !== undefined &&
          category.allotment[year][month] !== undefined
            ? category.allotment[year][month]
            : 0;
        result[year][month][name] = {
          alloted: allotted,
          spent: spent.toFixed(2)
        };
      });
    });
  });
  return result;
}

function Category(name) {
  this.id = faker.random.uuid();
  this.name = name;
  this.allotment = { '2019': { '6': 0, '7': 0, '8': 0 } };
}

export default BudgetPage;
