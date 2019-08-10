import React, { Component } from 'react';
import axios from 'axios';
import Header from './Components/Header.jsx';
// import './App.css';

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
        <h1>Welcome to Green Ocean!</h1>
      </div>
    );
  }
}
