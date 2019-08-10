import React, { Component } from 'react';
import Header from './Components/Header.jsx';
import Container from '@material-ui/core/Container';
// import './App.css';
import Budget from './Components/BudgetPage.jsx';
import fakeData from '../../db/dataSeeder.js';

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
        <Header />
        <Container maxWidth="sm">
          <h1>Welcome to Green Ocean!</h1>
        </Container>
        <Budget categories={this.state.budgetCategories} />
      </div>
    );
  }
}
