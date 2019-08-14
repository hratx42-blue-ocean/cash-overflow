import React, { Component } from 'react';

// Routing
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute.jsx';
import { Auth0Context } from './react-auth0-wrapper';
// Material Components
import Container from '@material-ui/core/Container';

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
      user: {}
    };
    this.api = `http://localhost:8000/api/example`;
    this.handleAddTransaction = this.handleAddTransaction.bind(this);
  }

  handleAddTransaction(stateObject) {
    let month = stateObject.inputDate._d.getMonth();
    let year = stateObject.inputDate._d.getFullYear();
    const accounts = this.state.user.accounts;

    let placeholder = this.state.user;
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
      user: placeholder
    });
  }

  componentDidMount() {
    const data = fakeData.createData();
    this.setState({
      budgetCategories: data.budgetCategories,
      accountData: data,
      user: data
    });
  }

  render() {
    const { accountData, budgetCategories } = this.state;
    const { user, loading } = this.context;

    return (
      <div className="app">
        <BrowserRouter>
          <Header />
          <Container>
            <h1>Welcome to Green Ocean!</h1>
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
                    allotments={budgetCategories}
                    categories={accountData.budgetCategories}
                    transactions={accountData.accounts[0].transactions}
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
                    user={this.state.user}
                    accountData={accountData}
                    user={user}
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
                    user={this.state.user}
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
