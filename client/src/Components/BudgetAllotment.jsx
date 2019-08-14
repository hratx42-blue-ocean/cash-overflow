import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BudgetAllottment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allotment: props.allotment,
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { allotment, clicked } = this.state;
    this.setState({ allotment: allotment + 1, clicked: !clicked });
  }

  render() {
    const { allotment } = this.state;
    return <div onClick={this.handleClick}>{allotment}</div>;
  }
}

BudgetAllottment.propTypes = {
  allotment: PropTypes.number,
  clicked: PropTypes.bool
};
