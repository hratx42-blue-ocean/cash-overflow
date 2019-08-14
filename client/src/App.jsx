import React, { Component } from 'react';
import Axios from 'axios';

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
      currentUser: '',
      budgetCategories: [],
      accountData: {
        accounts: [{ transactions: { year: { month: [] } } }]
      }
    };
    this.getUserData = this.getUserData.bind(this);
    this.postUserData = this.postUserData.bind.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.setAccountDataAndBudgetCategories = this.setAccountDataAndBudgetCategories.bind(
      this
    );
    this.updateAccountData = this.updateAccountData.bind(this);
  }

  getUserData(userEmail) {
    return Axios.get(`http://0.0.0.0:8000/api/users/getData?user=${userEmail}`);
  }

  postUserData(userObject) {
    Axios.post(`http://0.0.0.0:8000/api/users/upsertData`, {
      userUpdate: userObject
    }).then(okResponse => console.log(okResponse));
  }

  setCurrentUser(accountData) {
    const [currentAccountData] = accountData.data;
    this.setState({
      currentUser: currentAccountData.email
    });
    return currentAccountData;
  }

  setAccountDataAndBudgetCategories(currentAccountData) {
    const { budgetCategories } = currentAccountData;
    this.setState({
      budgetCategories: budgetCategories,
      accountData: currentAccountData
    });
  }

  updateAccountData(updatedAccountData) {
    this.postUserData(updatedAccountData);
  }

  componentDidMount() {
    this.getUserData('Eda80@hotmail.com')
      .then(this.setCurrentUser)
      .then(this.setAccountDataAndBudgetCategories)
      .catch(err => {
        console.log('mounting error: ', err);
      });
  }

  render() {
    const { accountData, budgetCategories } = this.state;
    const { user, loading } = this.context;

    return (
      <div className="app">
        <BrowserRouter>
          <Header />
          <Container maxWidth="sm">
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
                    updateAccountData={this.updateAccountData}
                  />
                )}
              />
              <PrivateRoute
                path="/dashboard"
                render={props => (
                  <DashboardPage
                    {...props}
                    accountData={accountData}
                    user={user}
                    loading={loading}
                    updateAccountData={this.updateAccountData}
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

App.contextType = Auth0Context;
