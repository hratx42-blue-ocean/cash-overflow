import React, { Component } from 'react';
import Header from './Components/Header.jsx';
import Container from '@material-ui/core/Container';
// import './App.css';
import Budget from './BudgetPage.jsx';
import CenteredTabs from './Components/TrendsPage.jsx';

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
        </Container>
        <Budget />
      </div>
    );
  }
}
