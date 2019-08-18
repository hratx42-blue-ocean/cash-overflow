import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BudgetTable from './BudgetTable.jsx';
import Loading from './Loading.jsx';
// import faker from 'faker';

class BudgetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: props.accounts,
      categories: props.categories,
      // txsByMonth: {},
      categoryBreakdown: {},
      currentYear: 2019,
      currentMonth: 8,
      open: false,
      textInput: ''
      // counter: props.counter
    };
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleSaveCategory = this.handleSaveCategory.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.recalculate = this.recalculate.bind(this);
    this.updateAllotments = this.updateAllotments.bind(this);
  }

  componentDidMount() {
    const { categories, accounts } = this.state;
    this.recalculate(categories, accounts);
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

    await this.props.asyncHandleUpdateCategories(categories, this.recalculate);
  }

  handleAddCategory() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  async handleSaveCategory() {
    const { categories, textInput, currentYear, currentMonth } = this.state;
    const categoryUpdate = JSON.parse(JSON.stringify(categories));
    let newCategory;
    // check for category existing for other months
    const extantCategory = categoryUpdate.filter(category => {
      return category.name === textInput;
    });
    if (extantCategory.length > 0) {
      if (extantCategory[0].allotment[currentYear]) {
        extantCategory[0].allotment[currentYear][currentMonth] = 0;
      } else {
        extantCategory[0].allotment[currentYear] = {};
        extantCategory[0].allotment[currentYear][currentMonth] = 0;
      }
      [newCategory] = extantCategory;
    } else {
      newCategory = new Category(textInput, currentYear, currentMonth);
    }
    categoryUpdate.push(newCategory);
    console.log(
      'Updated categories after addition should be: ',
      categoryUpdate
    );
    await this.props.asyncHandleUpdateCategories(
      categoryUpdate,
      this.recalculate
    );
    this.handleClose();
  }

  async handleDeleteCategory(deletedCategory) {
    const { categories, currentMonth, currentYear } = this.state;
    const categoryUpdate = JSON.parse(JSON.stringify(categories)).map(
      category => {
        if (category.name === deletedCategory) {
          delete category.allotment[currentYear][currentMonth];
        }
        return category;
      }
    );
    console.log(
      'Updated categories after deletion should be: ',
      categoryUpdate
    );
    await this.props.asyncHandleUpdateCategories(
      categoryUpdate,
      this.recalculate
    );
    this.handleClose();
  }

  handleTextInput(e) {
    const { value } = e.target;
    this.setState({
      textInput: value
    });
  }

  recalculate(categories, accounts) {
    const txsByMonth = compileTxs(accounts);
    const categoryBreakdown = compileSpent(categories, txsByMonth);
    this.setState({ categories, accounts, txsByMonth, categoryBreakdown });
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
    console.log('category breakdown is: ', categoryBreakdown);
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
        handleDeleteCategory={this.handleDeleteCategory}
        handleDeleteDialog={this.handleDeleteDialog}
        handleClose={this.handleClose}
        handleTextInput={this.handleTextInput}
        recalculate={this.recalculate}
      />
    );
  }
}

BudgetPage.propTypes = {
  allotments: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  transactions: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  updateAccountData: PropTypes.func,
  asyncHandleUpdateCategories: PropTypes.func.isRequired
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

function Category(name, year, month) {
  this.id = (420420420420 + Math.floor(Math.random() * 69696969)).toString();
  this.name = name;
  this.allotment = {};
  this.allotment[year] = {};
  this.allotment[year][month] = 0;
}

export default BudgetPage;
