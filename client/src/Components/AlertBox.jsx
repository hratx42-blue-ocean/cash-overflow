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
import AlertCard from './AlertCard.jsx';

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
    let alertHeader = null;
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
            subtotal += Number(transaction.amount);
          }
        }
      }
      if (subtotal > allotment) {
        alertType = 'overspent';
        alertHeader = `Overspending in ${categoryName}`;
      } else if (subtotal === allotment) {
        alertType = 'reached your limit';
        alertHeader = `You have reached your limit for ${categoryName}`;
      } else if (subtotal >= allotment * 0.9) {
        alertType = 'almost reached your limit';
        alertHeader = `Slow down with spending in ${categoryName}`;
      }
      console.log(alertType);
      if (alertType) {
        alerts.push({
          budgetCategory: categoryName,
          alertType,
          amountBudgeted: allotment.toFixed(2),
          amountSpent: subtotal.toFixed(2),
          alertHeader
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
    this.setState({
      activeStep: nextStep
    });
  }

  handleBack() {
    let prevStep = this.state.activeStep - 1;
    this.setState({
      activeStep: prevStep
    });
  }

  render() {
    let { alerts, activeStep, maxSteps } = this.state;
    if (alerts.length === 0) {
      alerts = [
        {
          budgetCategory: 'none',
          alertType: 'dev alert',
          amountBudgeted: '0',
          amountSpent: '0',
          alertHeader: 'dev alert - dummy data'
        }
      ];
    }
    return (
      <div
        style={{
          width: '100%',
          height: 150,
          flexGrow: 1
        }}
      >
        <Paper
          square
          elevation={0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Open Sans'
          }}
        >
          <AlertCard
            budgetCategory={alerts[activeStep].budgetCategory}
            alertType={alerts[activeStep].alertType}
            allotment={alerts[activeStep].amountBudgeted}
            spent={alerts[activeStep].amountSpent}
            alertHeader={alerts[activeStep].alertHeader}
          />
        </Paper>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next Alert
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
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
