import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Material Components
import Container from '@material-ui/core/Container';

// Custom Components
import Header from './Components/Header.jsx';
import LandingPage from './Components/LandingPage.jsx';
import TrendsPage from './Components/TrendsPage.jsx';
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
            <Route path="/trends" component={TrendsPage} />
          </Switch>
        </Container>
      </div>
    );
  }
}
