/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable comma-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-parens */
import React, { Component } from 'react';
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
    this.getAlerts(
      this.props.accounts,
      this.props.budget,
      this.props.recurringTransactions
    );
  }

  getAlerts(accounts, budget, transactions) {
    let alertHeader = null;
    const alerts = [];
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const filteredBudget = budget.filter(category => {
      if (category.allotment[year]) {
        if (category.allotment[year][month]) {
          return true;
        }
      }
    });
    for (let category of filteredBudget) {
      let alertType = null;
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

    for (let payment of transactions) {
      let date = new Date(payment.startDate);
      if (
        date.getDate() - today.getDate() < 4 &&
        date.getDate() - today.getDate() > 0
      ) {
        date.setMonth(today.getMonth());
        alerts.push({
          budgetCategoryName: payment.category,
          amount: payment.amount,
          date: date,
          payee: payment.payee,
          alertType: 'Payment Reminder',
          alertHeader: 'You have a payment coming up!'
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
          alertType: 'No Alerts',
          amountBudgeted: '0',
          amountSpent: '0',
          alertHeader:
            'Your spending is within all of your category allotments this month'
        }
      ];
    }
    return (
      <div
        style={{
          width: '100%',
          height: 150,
          flexGrow: 1,
          marginTop: 15
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
            date={alerts[activeStep].date}
            payee={alerts[activeStep].payee}
            amount={alerts[activeStep].amount}
          />
        </Paper>
<<<<<<< HEAD
        <MobileStepper
          style={{marginTop: 15}}
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
=======
        {alerts.length > 1 ? (
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
        ) : null}
>>>>>>> 8fad1ce3d94782abf7f8366401d81d867ddea9fa
      </div>
    );
  }
}

AlertBox.propTypes = {
  accounts: PropTypes.array.isRequired,
  budget: PropTypes.array.isRequired,
  recurringTransactions: PropTypes.array.isRequired
};
