/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable comma-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export default class AlertBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
      maxSteps: 0,
      activeStep: 0
    };
    this.getAlerts = this.getAlerts.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    this.getAlerts(this.props.accounts, this.props.budget);
    console.log(this.state.alerts);
  }

  getAlerts(accounts, budget) {
    let alertType = null;
    const alerts = [];
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    for (let category of budget) {
      let categoryName = category.name;
      let allotment = category.allotment[year][month];
      let subtotal = 0;
      for (let account of accounts) {
        for (let transaction of account.transactions[year][month]) {
          if (transaction.category === categoryName) {
            console.log(Number(transaction.amount));
            subtotal += Number(transaction.amount);
            console.log(subtotal);
          }
        }
      }
      console.log(subtotal, allotment);
      if (subtotal > allotment) {
        alertType = 'overspent';
      } else if (subtotal === allotment) {
        alertType = 'reached your limit';
      } else if (subtotal >= allotment * 0.9) {
        alertType = 'almost reached your limit';
      }
      console.log(alertType);
      if (alertType) {
        alerts.push({
          budgetCategory: categoryName,
          alertType,
          amountBudgeted: allotment,
          amountSpent: subtotal
        });
      }
    }
    this.setState({
      alerts: alerts,
      maxSteps: alerts.length
    });
  }

  handleNext() {
    let nextStep = this.state.activeStep + 1;
    // this.state.activeStep + 1 > this.state.maxSteps - 1
    //   ? (nextStep = this.state.maxSteps - 1)
    //   : (nextStep = this.state.activeStep + 1);
    this.setState({
      activeStep: nextStep
    });
  }

  handleBack() {
    let prevStep = this.state.activeStep - 1;
    // this.state.activeStep - 1 >= 0
    //   ? (prevStep = this.setState.activeStep - 1)
    //   : (prevStep = 0);
    this.setState({
      activeStep: prevStep
    });
  }

  render() {
    if (this.state.alerts.length === 0) {
      return (
        <>
          <Typography>No alerts!</Typography>
        </>
      );
    }
    return (
      <div
        style={{
          width: '40%',
          height: 150,
          margin: 20,
          padding: 25,
          flexGrow: 1
        }}
      >
        <Paper
          square
          elevation={0}
          style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Open Sans'
          }}
        >
          <Typography variant="h2">
            Alert for {this.state.alerts[this.state.activeStep].budgetCategory}
          </Typography>
          <Typography variant="body1">
            You have {this.state.alerts[this.state.activeStep].alertType} for
            your {this.state.alerts[this.state.activeStep].budgetCategory}
            category. You were budgeted to spend $
            {this.state.alerts[this.state.activeStep].amountBudgeted} and you
            have spent ${this.state.alerts[this.state.activeStep].amountSpent}.
            Be careful!
          </Typography>
        </Paper>
        <MobileStepper
          steps={this.state.maxSteps}
          position="static"
          variant="text"
          activeStep={this.state.activeStep}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={this.state.activeStep === this.state.maxSteps - 1}
            >
              Next Alert
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={this.state.activeStep === 0}
            >
              <KeyboardArrowLeft />
              Previous Alert
            </Button>
          }
        />
      </div>
    );
  }
}
