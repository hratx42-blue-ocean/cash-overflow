import React, { Component } from 'react';
import Axios from 'axios';

// Routing
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute.jsx';

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
      auth: false,
      currentUser: null,
      budgetCategories: [],
      accountData: {}
    };
    this.getUserData = this.getUserData.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.passAccountAndBudgetCategories = this.passAccountAndBudgetCategories.bind(
      this
    );
  }

  getUserData(userEmail) {
    return Axios.get(`http://0.0.0.0:8000/api/users/getData?user=${userEmail}`);
  }

  setCurrentUser(userData) {
    this.setState({
      currentUser: userData.data[0]
    });

    return userData;
  }

  passAccountAndBudgetCategories(userData) {
    this.setState({
      budgetCategories: userData.data[0].budgetCategories,
      accountData: userData.data[0]
    });
  }

  componentDidMount() {
    this.getUserData('Eda80@hotmail.com')
      .then(this.setCurrentUser)
      .then(this.passAccountAndBudgetCategories);
  }

  render() {
    const { accountData, budgetCategories } = this.state;
    return (
      <div className="app">
        <BrowserRouter>
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
                  <BudgetPage {...props} categories={budgetCategories} />
                )}
              />
              <PrivateRoute
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
              <Route component={ErrorPage} />
            </Switch>
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}
