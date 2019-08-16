import React, { Component } from 'react';
import axios from 'axios';

// Routing
import { Switch, Route, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import PrivateRoute from './Components/PrivateRoute.jsx';
import { Auth0Context } from './react-auth0-wrapper';
// Material Components

// Custom Components
import Header from './Components/Header.jsx';
import AccountsPage from './Components/AccountsPage.jsx';
import BudgetPage from './Components/BudgetPage.jsx';
import DashboardPage from './Components/DashboardPage.jsx';
import LandingPage from './Components/LandingPage.jsx';
import TrendsPage from './Components/TrendsPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import ProfilePage from './Components/ProfilePage.jsx';
import ErrorPage from './Components/ErrorPage.jsx';
import Loading from './Components/Loading.jsx';

import createFakeUser from './fakeUserGenerator.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      loadingUser: true,
      currentUser: '',
      budgetCategories: [],
      accountData: {
        accounts: [{ transactions: { year: { month: [] } } }]
      }
    };
    this.getUserData = this.getUserData.bind(this);
    this.postUserData = this.postUserData.bind(this);
    this.updateAccountData = this.updateAccountData.bind(this);
    this.setAccountData = this.setAccountData.bind(this);
    this.handleAddTransaction = this.handleAddTransaction.bind(this);
  }

  postUserData(userObject) {
    axios
      .post('http://0.0.0.0:8000/api/users/upsertData', {
        userUpdate: userObject
      })
      .then(okResponse => console.log(okResponse));
  }

  componentDidMount() {
    const { user, isAuthenticated, loading } = this.context;

    if (!isAuthenticated) {
      this.setState({
        loadingUser: false
      });
    }

    console.log(
      `componentDidMount gets the following from Auth0Context user:${user}, isAuthenticated:${isAuthenticated}, loading:${loading}`
    );
  }

  componentDidUpdate() {
    const { user } = this.context;

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
        // check to see if the user exists
        async () => {
          const userData = await this.getUserData();

          console.log(
            `We have this many pieces of data for your account: ${
              Object.keys(userData.data).length
            }`
          );

          // if the user is new, give them demo data
          if (userData.data.length > 0) {
            this.setAccountData(userData);
            console.log(`Welcome back ${userData.data.firstName}`);
          } else {
            console.log(`Welcome to CashOverflow!`);
            // TODO: Fake user data should be replaced with SignUp flow logic.
            const newUserData = createFakeUser();

            console.log(
              `We'll give you some sample data based on the average American to get you started.`
            );
            newUserData.email = user.email;
            newUserData.userID = userID;

            this.setState({
              accountData: newUserData,
              loadingUser: false
            });
          }
        }
      );
    }
  }

  getUserData() {
    const { userID } = this.state;
    if (userID) {
      return axios.get(
        `http://0.0.0.0:8000/api/users/getData?userid=${userID}`
      );
    }
  }

  setAccountData(incomingAccountData) {
    console.log(
      'Attempting to set account data to:',
      JSON.stringify(incomingAccountData.data)
    );
    const [currentAccountData] = incomingAccountData.data;
    const { budgetCategories, email } = currentAccountData;
    this.setState(
      {
        accountData: currentAccountData,
        budgetCategories,
        currentUser: email
      },
      () => {
        this.setState({ loadingUser: false });
      }
    );
  }

  updateAccountData(updatedAccountData) {
    this.postUserData(updatedAccountData);
  }

  handleAddTransaction(stateObject) {
    // this function will live at the dashboard level eventually

    const {
      inputAccount,
      inputAmount,
      inputCategory,
      inputDate,
      inputPayee
    } = stateObject;
    const month = inputDate._d.getMonth();
    const year = inputDate._d.getFullYear();
    const accountUpdate = { ...this.state.accountData };
    const { accounts } = accountUpdate;

    const transaction = {
      id: (420420420420420 + Math.floor(Math.random() * 69696969)).toString(),
      amount: inputAmount,
      category: inputCategory,
      date: inputDate._d,
      payee: inputPayee,
      recurring: false
    };

    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].name === inputAccount) {
        accountUpdate.accounts[i].transactions[year][month].push(transaction);
        break;
      }
      this.updateAccountData(accountUpdate);
    }

    this.setState({
      currentUser: accountUpdate
    });

    // fn below will update app state, and then POST updated userObject to DB

    this.updateAccountData(accountUpdate);
  }

  render() {
    const { accountData, budgetCategories, loadingUser } = this.state;
    const { isAuthenticated, loading } = this.context;

    if (loadingUser) {
      return (
        <div data-testid="loading-user">
          <Loading />
        </div>
      );
    }

    return (
      <div className="app">
        <Header />
        <Container>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                !isAuthenticated ? (
                  <LandingPage />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <PrivateRoute
              path="/accounts"
              render={props => (
                <AccountsPage
                  {...props}
                  accountData={accountData}
                  loading={loading}
                  isAuthenticated={isAuthenticated}
                  updateAccountData={this.updateAccountData}
                />
              )}
            />
            <PrivateRoute
              path="/budget"
              render={props => (
                <BudgetPage
                  accounts={accountData.accounts}
                  categories={budgetCategories}
                  loading={loading}
                  isAuthenticated={isAuthenticated}
                  updateAccountData={this.updateAccountData}
                />
              )}
            />
            <PrivateRoute
              path="/dashboard"
              render={props => (
                <DashboardPage
                  {...props}
                  handleAddTransaction={this.handleAddTransaction}
                  accountData={accountData}
                  currentUser={this.state.currentUser}
                  loading={loading}
                  isAuthenticated={isAuthenticated}
                />
              )}
            />
            <PrivateRoute
              path="/profile"
              render={props => (
                <ProfilePage
                  {...props}
                  accountData={accountData}
                  loading={loading}
                  isAuthenticated={isAuthenticated}
                  updateAccountData={this.updateAccountData}
                />
              )}
            />
            <PrivateRoute
              path="/trends"
              render={props => (
                <TrendsPage
                  {...props}
                  accountData={accountData}
                  loading={loading}
                  isAuthenticated={isAuthenticated}
                />
              )}
            />
            <Route component={ErrorPage} />
          </Switch>
        </Container>
      </div>
    );
  }
}
App.contextType = Auth0Context;
