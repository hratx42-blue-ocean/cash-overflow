import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Material Components
import Container from '@material-ui/core/Container';
// import './App.css';
import CenteredTabs from './Components/TrendsPage.jsx';

// Custom Components
import Header from './Components/Header.jsx';
import AccountsPage from './Components/AccountsPage.jsx';
import BudgetPage from './Components/BudgetPage.jsx';
import DashboardPage from './Components/DashboardPage.jsx';
import LandingPage from './Components/LandingPage.jsx';
import TrendsPage from './Components/TrendsPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import ProfilePage from './Components/ProfilePage.jsx';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
    this.api = `http://localhost:8000/api/example`;
  }
  componentDidMount() {}

  render() {
    return (
      <div className="app">
        <Header />
        <Container maxWidth="sm">
          <h1>Welcome to Green Ocean!</h1>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/accounts" component={AccountsPage} />
            <Route path="/budget" component={BudgetPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/trends" component={TrendsPage} />
          </Switch>
        </Container>
      </div>
    );
  }
}
