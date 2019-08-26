import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BudgetAllotmentField from './BudgetAllotmentField.jsx';

export default class BudgetAllottment extends Component {
  constructor(props) {
    super(props);

    const {
      allotment,
      category,
      month,
      name,
      recalculate,
      updateAllotments,
      year
    } = this.props;

    this.state = {
      allotment: allotment,
      category: category,
      clicked: false,
      display: allotment,
      month: month,
      name: name,
      updateAllotments: updateAllotments,
      year: year
    };

    this.recalculate = recalculate;
    this.updateAllotments = updateAllotments;

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
    const { name } = this.state;
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = Number(e.target.value);
      this.setState({ clicked: false });
      Promise.resolve(this.updateAllotments(name, val)).then(
        // need to see if this recalculate is still doing something
        this.recalculate()
      );
    }
  }

  render() {
    const { allotment, clicked } = this.state;

    // create a variable to reassign components to
    let renderedComponent = <div onClick={this.handleClick}>{allotment}</div>;

    // handle switch the input based on the click
    if (clicked) {
      renderedComponent = (
        <BudgetAllotmentField
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
