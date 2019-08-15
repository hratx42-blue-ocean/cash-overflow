import React, { Component } from 'react';

// Routing
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import PrivateRoute from './Components/PrivateRoute.jsx';
import { Auth0Context } from './react-auth0-wrapper';
// Material Components

// import Budget from './Components/BudgetPage.jsx';
import fakeData from '../../db/dataSeeder.js';

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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetCategories: [],
      accountData: {
        accounts: [{ transactions: { year: { month: [] } } }]
      },
      currentUser: {}
    };
    this.api = `http://localhost:8000/api/example`;
    this.handleAddTransaction = this.handleAddTransaction.bind(this);
  }

  handleAddTransaction(stateObject) {
    let month = stateObject.inputDate._d.getMonth();
    let year = stateObject.inputDate._d.getFullYear();
    const accounts = this.state.currentUser.accounts;

    let placeholder = this.state.currentUser;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].name === stateObject.inputAccount) {
        placeholder.accounts[i].transactions[year][month].push({
          amount: stateObject.inputAmount,
          category: stateObject.inputCategory,
          date: stateObject.inputDate._d,
          payee: stateObject.inputPayee,
          recurring: false
        });
        break;
      }
    }
    this.setState({
      currentUser: placeholder
    });
  }

  componentDidMount() {
    const data = fakeData.createData();
    this.setState({
      budgetCategories: data.budgetCategories,
      accountData: data,
      currentUser: data
    });
    console.log('data is', data);
  }

  render() {
    const { accountData, budgetCategories } = this.state;
    const { user, loading } = this.context;

    return (
      <div className="app">
        <BrowserRouter>
          <Header />
          <Container>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <LandingPage {...props} accountData={accountData} />
                )}
              />
              <Route
                path="/accounts"
                render={props => (
                  <AccountsPage {...props} accountData={accountData} />
                )}
              />
              <Route
                path="/budget"
                render={props => (
                  <BudgetPage
                    {...props}
                    accounts={accountData.accounts}
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
                    accountData={accountData}
                    loading={loading}
                  />
                )}
              />
              <Route
                path="/login"
                render={props => (
                  <LoginPage {...props} accountData={accountData} />
                )}
              />
              <Route
                path="/profile"
                render={props => (
                  <ProfilePage
                    {...props}
                    currentUser={this.state.currentUser}
                    accountData={accountData}
                  />
                )}
              />
              <Route
                path="/trends"
                render={props => (
                  <TrendsPage {...props} accountData={accountData} />
                )}
              />
              <Route component={ErrorPage} />
            </Switch>
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}

App.contextType = Auth0Context;
