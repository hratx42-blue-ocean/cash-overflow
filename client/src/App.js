import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

// Material Components
import Container from '@material-ui/core/Container';

// import './App.css';
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
import Budget from './Components/BudgetPage.jsx';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      budgetCategories: [],
      accountData: {}
    };
    this.api = `http://localhost:8000/api/example`;
  }
  componentDidMount() {
    const data = fakeData.createData();
    this.setState({
      budgetCategories: data.budgetCategories,
      accountData: data
    });
  }

  render() {
    const { accountData } = this.state;
    return (
      <div className="app">
        <Header />
        <Container maxWidth="sm">
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
                <BudgetPage {...props} accountData={accountData} />
              )}
            />
            <Route
              path="/dashboard"
              render={props => (
                <DashboardPage {...props} accountData={accountData} />
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
                <ProfilePage {...props} accountData={accountData} />
              )}
            />
            <Route
              path="/trends"
              render={props => (
                <TrendsPage {...props} accountData={accountData} />
              )}
            />
          </Switch>
        </Container>
      </div>
    );
  }
}
