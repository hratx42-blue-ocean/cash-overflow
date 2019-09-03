import React, { Component } from 'react';
import axios from 'axios';

// Routing
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { Auth0Context } from './react-auth0-wrapper';
import ProtectedSwitch from './Components/ProtectedSwitch';
import DemoSwitch from './Components/DemoSwitch';

// Custom Components
import ButtonAppBar from './Components/Appbar/Header';
import Footer from './Components/Footer';
import Loading from './Components/Loading';
import db from './utils/databaseRequests';

const calculateTotalBalance = accounts => {
  return accounts.reduce((sum, account) => {
    // only adds balances for accounts of type checking or savings
    if (account.type !== 3) {
      return sum + account.balance;
    }
    return sum;
  }, 0);
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      user: {}, // TODO: RFC part of the refactor
      accounts: [], // TODO: RFC part of the refactor
      transactions: [], // TODO: RFC part of the refactor
      targetDate: moment(), // TODO: RFC
      loadingUser: true,
      currentUser: '',
      budgetCategories: [],
      accountData: {
        accounts: [{ transactions: { year: { month: [] } } }]
      },
      isDemo: false
    };
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.pushNewItem = this.pushNewItem.bind(this);
    this.toggleDemo = this.toggleDemo.bind(this);
  }

  componentDidMount() {
    const { isAuthenticated } = this.context;

    // if the user is unauthenticated, stop loading
    if (!isAuthenticated) {
      this.setState({
        loadingUser: false
      });
    }
  }

  componentDidUpdate() {
    const { user } = this.context;

    // See if a user has authenticated
    if (user && user.sub.substring(6) !== this.state.userID) {
      console.log(`Looks like you're logged in as: ${user.email}`);

      // set the userID to the UUID provided
      const userID = user.sub.substring(6);
      console.log(`Your UserID is ${userID}`);
      this.setState(
        {
          userID,
          loadingUser: true
        },
        // check to see if the user exists in the database
        async () => {
          const response = await db.getUserData(userID);

          const { data: userData } = response;

          // if they exist, set their data in state
          if (userData.length > 0) {
            this.setAccountData(userData[0]);
            console.log(`Welcome back ${userData[0].firstName}!`);
          } else {
            // give the demo data if they don't exit
            console.log(`Welcome to CashOverflow!`);
            // TODO: Fake user data should be replaced with SignUp flow logic.
            // const newUserData = createFakeUser();

            console.log(
              `We'll give you some sample data based on the average American's to get you started.`
            );
            // newUserData.email = user.email;
            // newUserData.userID = userID;

            // this.setAccountData(newUserData);
          }
        }
      );
    }
  }

  handleMonthChange(inc = 0) {
    const { targetDate } = this.state;
    let newDate;
    if (inc === 0) {
      newDate = moment();
    } else {
      newDate = targetDate.subtract(inc, 'months');
    }
    this.setState({ targetDate: newDate });
  }

  pushNewItem(type, item) {
    const array = this.state[type];
    array.push(item);
    this.setState({ [type]: array });
  }

  toggleDemo() {
    const user = 'johnny.cash@cashoverflow.app';
    const { targetDate } = this.state;
    const year = targetDate.format('YYYY');
    const month = targetDate.format('MM');
    db.getUserData(user)
      .then(({ data }) => {
        this.setState({ user: data });
        return data.id;
      })
      .then(id =>
        Promise.all([
          db.getUserAccountData(id),
          db.getUserCategoryData(id),
          db.getUserTransactionData(id, year, month)
        ])
      )
      .then(([accounts, categories, transactions]) => {
        this.setState({
          accounts: accounts.data,
          categories: categories.data,
          transactions: transactions.data
        });
      })
      .then(() => {
        if (!this.state.isDemo) {
          this.setState({
            isDemo: true,
            loadingUser: false
          });
        } else {
          this.setState({
            isDemo: false,
            loadingUser: false
          });
        }
      });
  }

  render() {
    const {
      user,
      accounts,
      categories,
      transactions,
      targetDate,
      accountData,
      budgetCategories,
      isDemo,
      currentUser,
      loadingUser
    } = this.state;
    const { isAuthenticated } = this.context;
    console.log('is authenticated is: ', isAuthenticated);
    if (loadingUser) {
      return (
        <div data-testid="loading-user">
          <Loading />
        </div>
      );
    }

    return (
      <>
        <ButtonAppBar isDemo={isDemo} toggleDemo={this.toggleDemo} xs={12} />
        <Container maxWidth="lg" className="app">
          {isDemo ? (
            <DemoSwitch
              user={user}
              accounts={accounts}
              categories={categories}
              transactions={transactions}
              targetDate={targetDate}
              handleMonthChange={this.handleMonthChange}
              pushNewItem={this.pushNewItem}
              accountData={accountData}
              budgetCategories={budgetCategories}
              updateAccountData={this.setAccountData}
              asyncHandleUpdateCategories={this.asyncHandleUpdateCategories}
              currentUser={currentUser}
              handleAddTransaction={this.handleAddTransaction}
              toggleDemo={this.toggleDemo}
              isDemo={isDemo}
              loading={false}
              isAuthenticated
            />
          ) : (
            <ProtectedSwitch
              accountData={accountData}
              budgetCategories={budgetCategories}
              updateAccountData={this.setAccountData}
              asyncHandleUpdateCategories={this.asyncHandleUpdateCategories}
              currentUser={currentUser}
              handleAddTransaction={this.handleAddTransaction}
              toggleDemo={this.toggleDemo}
              isDemo={isDemo}
            />
          )}
        </Container>
        <Footer />
      </>
    );
  }
}
App.contextType = Auth0Context;
