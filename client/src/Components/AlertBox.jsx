/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable comma-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-parens */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// Styles below copied from MaterialUI docs and modified slightly
const useStyles = makeStyles(theme => ({
  box: {
    width: '40%',
    height: 150,
    margin: 20,
    padding: 25,
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    fontFamily: 'Open Sans'
  }
}));

// Function to generate alerts based on overspent or nearly-overpspent transaction categories
const getAlerts = userObject => {
  let alertType = null;
  const alerts = [];
  const today = new Date();
  const month = today.getDate();
  const year = today.getFullYear();
  for (category of userObject.budgetCategories) {
    let categoryName = category.name;
    let allotment = category.allotment[year][month];
    let subtotal = 0;
    for (account of userObject.accounts) {
      for (transaction of account.transactions[year][month]) {
        if (transaction.category === categoryName) {
          subtotal += transaction.amount;
        }
      }
    }
    if (subtotal > allotment) {
      alertType = 'overspent';
    } else if (subtotal === allotment) {
      alertType = 'reached your limit';
    } else if (subtotal >= allotment * 0.9) {
      alertType = 'almost reached your limit';
    }
    if (alertType) {
      alerts.push({
        budgetCategory: categoryName,
        alertType,
        amountBudgeted: allotment,
        amountSpent: subtotal
      });
    }
  }
  return alerts;
};

const AlertBox = props => {
  const { currentUser } = props;
  const alerts = getAlerts(currentUser);
  const classes = useStyles();
  const theme = useTheme();
  // The stepping logic is all from the Material UI documentation
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = alerts.length;

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <div className={classes.box}>
      <Paper square elevation={0} className={classes.header}>
        <Typography variant="h2">
          Alert for {alerts[activeStep].budgetCategory}
        </Typography>
        <Typography variant="body1">
          You have {alerts[activeStep].alertType} for your{' '}
          {alerts[activeStep].budgetCategory} category. You were budgeted to
          spend ${alerts[activeStep].amountBudgeted} and you have spent $
          {alerts[activeStep].amountSpent}. Be careful!
        </Typography>
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next Alert
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Previous Alert
          </Button>
        }
      />
    </div>
  );
};

AlertBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentUser: PropTypes.object.isRequired
};

export default AlertBox;
