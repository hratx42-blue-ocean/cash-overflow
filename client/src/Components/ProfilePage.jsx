import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ProfileFirstName from './ProfileFirstName.jsx';
import ProfileLastName from './ProfileLastName.jsx';
import ProfileEmail from './ProfileEmail.jsx';
import PropTypes from 'prop-types';
import ProfilePassword from './ProfilePassword.jsx';
import ProfileRecurringPayments from './ProfileRecurringPayments.jsx';
import ProfileRPList from './ProfileRPList.jsx';
import Loading from './Loading.jsx';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.accountData.email,
      firstName: this.props.accountData.firstName,
      lastName: this.props.accountData.lastName,
      budgetCategories: this.props.accountData.budgetCategories,
      accounts: this.props.accountData.accounts,
      notifications: this.props.accountData.notifications,
      recurringTransactions: this.props.accountData.recurringTransactions,
      userID: this.props.accountData.userID,
      inputDay: 1,
      inputAmount: 0,
      emailIsHidden: true,
      firstNameIsHidden: true,
      passwordIsHidden: true,
      lastNameIsHidden: true,
      input: '',
      inputPayee: 'payee',
      inputAccount: 'account',
      inputCategory: 'category',
      showSuccessMessage: false
    };

    this.emailButtonHandler = this.emailButtonHandler.bind(this);
    this.firstNameButtonHandler = this.firstNameButtonHandler.bind(this);
    this.lastNameButtonHandler = this.lastNameButtonHandler.bind(this);
    this.passwordButtonHandler = this.passwordButtonHandler.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFirstNameSubmit = this.handleFirstNameSubmit.bind(this);
    this.handleLastNameSubmit = this.handleLastNameSubmit.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.closePasswordResetMessage = this.closePasswordResetMessage.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handlePayeeInput = this.handlePayeeInput.bind(this);
    this.handleAccountInput = this.handleAccountInput.bind(this);
    this.handleInputAmount = this.handleInputAmount.bind(this);
    this.handleRecurringPayment = this.handleRecurringPayment.bind(this);
    this.handleCategoryInput = this.handleCategoryInput.bind(this);
    this.toggleSuccessMessage = this.toggleSuccessMessage.bind(this);
  }

  emailButtonHandler(e) {
    this.setState({
      emailIsHidden: !this.state.emailIsHidden
    });
  }

  firstNameButtonHandler(e) {
    this.setState({
      firstNameIsHidden: !this.state.firstNameIsHidden
    });
  }

  lastNameButtonHandler(e) {
    this.setState({
      lastNameIsHidden: !this.state.lastNameIsHidden
    });
  }

  handlePayeeInput(value) {
    this.setState({
      inputPayee: value.target.value
    });
  }

  passwordButtonHandler(e) {
    axios
      .post({
        method: 'POST',
        url: 'https://greenocean.auth0.com/dbconnections/change_password',
        headers: { 'content-type': 'application/json' },
        body: {
          client_id: '05RvxwAP7dSW5I9uPHxP6m7hVKHoIjS3',
          email: this.state.email,
          connection: 'Username-Password-Authentication'
        },
        json: true
      })
      .then(this.setState({ passwordIsHidden: !this.state.passwordIsHidden }))
      .catch(err => {
        throw err;
      });
  }

  closePasswordResetMessage() {
    this.setState({ passwordIsHidden: !this.setState.passwordIsHidden });
  }

  handleInput(e) {
    const input = e.target.value;
    this.setState({ input });
  }

  handleFirstNameSubmit(e) {
    // send input to updatedatabase
    this.setState(
      {
        firstNameIsHidden: !this.state.firstNameIsHidden,
        firstName: this.state.input
      },
      () => this.props.updateAccountData(this.state)
    );
  }

  handleLastNameSubmit(e) {
    // send input to updatedatabase
    this.setState(
      {
        lastNameIsHidden: !this.state.lastNameIsHidden,
        lastName: this.state.input
      },
      () => this.props.updateAccountData(this.state)
    );
  }

  handleEmailSubmit(e) {
    // send input to updatedatabase
    this.setState(
      {
        emailIsHidden: !this.state.emailIsHidden,
        email: this.state.input
      },
      () => this.props.updateAccountData(this.state)
    );
  }

  handleDayChange(day) {
    let inputDay = day.target.value;
    this.setState({ inputDay });
  }

  handleInputAmount(value) {
    let inputAmount = Number(value.target.value);
    this.setState({ inputAmount });
  }

  handleAccountInput(event) {
    let inputAccount = event.target.value;
    this.setState({ inputAccount });
  }

  handleCategoryInput(event) {
    let inputCategory = event.target.value;
    this.setState({ inputCategory });
  }

  toggleSuccessMessage() {
    this.setState({
      showSuccessMessage: !this.state.showSuccessMessage,
      inputPayee: 'payee',
      inputAccount: 'account',
      inputCategory: 'category',
      inputDay: 1,
      inputAmount: 0
    });
  }

  handleRecurringPayment() {
    let today = new Date();
    if (this.state.inputDay < today.getDate()) {
      today.setMonth(today.getMonth() + 1);
      today.setDate(this.state.inputDay);
    }

    const placeholder = this.state.recurringTransactions;
    placeholder.push({
      amount: this.state.inputAmount,
      category: this.state.inputCategory,
      payee: this.state.inputPayee,
      startDate: today,
      frequency: 'monthly'
    });

    this.setState(
      {
        recurringTransactions: placeholder
      },
      () => {
        this.props.updateAccountData(this.state);
        this.toggleSuccessMessage();
      }
    );
  }

  render() {
    const { loading, isAuthenticated } = this.props;

    if (loading || !isAuthenticated) {
      return (
        <div data-testid="auth-loading">
          <Loading />
        </div>
      );
    }

    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        // spacing={1}
        className="profilePage"
      >
        <Grid container>
          <Grid item xs={4}>
            <ProfileFirstName
              className="firstName"
              firstNameIsHidden={this.state.firstNameIsHidden}
              firstName={this.state.firstName}
              firstNameButtonHandler={this.firstNameButtonHandler}
              handleInput={this.handleInput}
              handleFirstNameSubmit={this.handleFirstNameSubmit}
            />

            <ProfileLastName
              lastNameIsHidden={this.state.lastNameIsHidden}
              lastName={this.state.lastName}
              lastNameButtonHandler={this.lastNameButtonHandler}
              handleInput={this.handleInput}
              handleLastNameSubmit={this.handleLastNameSubmit}
            />

            <ProfileEmail
              emailIsHidden={this.state.emailIsHidden}
              email={this.state.email}
              emailButtonHandler={this.emailButtonHandler}
              handleInput={this.handleInput}
              handleEmailSubmit={this.handleEmailSubmit}
            />

            <ProfilePassword
              passwordIsHidden={this.state.passwordIsHidden}
              passwordButtonHandler={this.passwordButtonHandler}
              closePasswordResetMessage={this.closePasswordResetMessage}
            />
          </Grid>
          <Grid item xs={4}>
            <ProfileRecurringPayments
              handleDayChange={this.handleDayChange}
              handleInputAmount={this.handleInputAmount}
              handlePayeeInput={this.handlePayeeInput}
              handleAccountInput={this.handleAccountInput}
              handleCategoryInput={this.handleCategoryInput}
              categories={this.state.budgetCategories}
              accounts={this.state.accounts}
              inputAmount={this.state.inputAmount}
              inputAccount={this.state.inputAccount}
              inputDay={this.state.inputDay}
              inputCategory={this.state.inputCategory}
              handleRecurringPayment={this.handleRecurringPayment}
              showSuccessMessage={this.state.showSuccessMessage}
              toggleSuccessMessage={this.toggleSuccessMessage}
            />
            <Grid item xs={4}>
              <ProfileRPList
                recurringTransactions={this.state.recurringTransactions}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProfilePage.defaultProps = {
  accountData: {
    email: 'asdf@asdf.com',
    firstName: 'lsdkfj',
    lastName: 'lkdasjf'
  }
};
ProfilePage.propTypes = {
  accountData: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};
