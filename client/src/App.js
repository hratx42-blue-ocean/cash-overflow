import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

// Material Components
import Container from '@material-ui/core/Container';
import fetch from 'node-fetch';

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
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      budgetCategories: []
    };
    this.api = `http://localhost:8000/api/example`;
  }
  componentDidMount() {
    const data = fakeData.createData();
    this.setState({
      budgetCategories: data.budgetCategories
    });
  }

  render() {
    return (
      <div className="app">
<<<<<<< HEAD
        <h1>Welcome to Blue Ocean!</h1>
        <ul>
          {this.state.seaCreatures.map((creature, index) => (
            <li key={index}>{creature}</li>
          ))}
        </ul>
        <Accounts />
=======
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
>>>>>>> e3cb1ecef66f72f5ba0478c424a040164a87e8d5
      </div>
    );
  }
}
