import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BudgetAllottmentField from './BudgetAllotmentField.jsx';

export default class BudgetAllottment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allotment: props.allotment,
      display: props.allotment,
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick() {
    const { clicked } = this.state;
    this.setState({ clicked: !clicked });
  }

  handleClickAway() {
    this.setState({ clicked: false });
  }

  handleKeyPress(e) {
    const { display, clicked } = this.state;
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = Number(e.target.value);
      this.setState({ allotment: val, clicked: false });
    }
  }

  render() {
    const { allotment, clicked } = this.state;

    // create a variable to reassign components to
    let renderedComponent = <div onClick={this.handleClick}>{allotment}</div>;

    // handle switch the input based on the click
    if (clicked) {
      renderedComponent = (
        <BudgetAllottmentField
          handleClickAway={this.handleClickAway}
          handleKeyPress={this.handleKeyPress}
        />
      );
    }

    return renderedComponent;
  }
}

BudgetAllottment.propTypes = {
  allotment: PropTypes.number,
  clicked: PropTypes.bool
};
