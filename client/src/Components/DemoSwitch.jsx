import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import { Auth0Context } from '../react-auth0-wrapper';
import Header from './Appbar/Header';
import AccountsPage from './Accounts/AccountsPage';
import BudgetPage from './Budget/BudgetPage';
import DashboardPage from './Dashboard/DashboardPage';
import LandingPage from './LandingPage';
import TrendsPage from './TrendsPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import ErrorPage from './ErrorPage';

export default function DemoSwitch(props) {
  const {
    user,
    accounts,
    categories,
    transactions,
    targetDate,
    handleMonthChange,
    pushNewItem,
    toggleDemo,
    isDemo,
    isAuthenticated,
    loading
  } = props;

  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      {/* <Route
        path="/home"
        render={() => <LandingPage toggleDemo={toggleDemo} />}
      /> */}
      <Route
        path="/accounts"
        render={props => (
          <AccountsPage
            {...props}
            user={user}
            accounts={accounts}
            categories={categories}
            transactions={transactions}
            targetDate={targetDate}
            handleMonthChange={handleMonthChange}
            pushNewItem={pushNewItem}
            loading={loading}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
      <Route
        path="/budget"
        render={props => (
          <BudgetPage
            user={user}
            categories={categories}
            transactions={transactions}
            targetDate={targetDate}
            handleMonthChange={handleMonthChange}
            loading={loading}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
      <Route
        path="/dashboard"
        render={props => (
          <DashboardPage
            {...props}
            user={user}
            accounts={accounts}
            categories={categories}
            transactions={transactions}
            loading={loading}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
      {/* <Route
        path="/profile"
        render={props => (
          <ProfilePage
            {...props}
            accountData={accountData}
            updateAccountData={updateAccountData}
            loading={loading}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
      <Route
        path="/trends"
        render={props => (
          <TrendsPage
            {...props}
            accountData={accountData}
            loading={loading}
            isAuthenticated={isAuthenticated}
          />
        )}
      /> */}
      <Route component={ErrorPage} />
    </Switch>
  );
}

DemoSwitch.propTypes = {
  accountData: PropTypes.object.isRequired,
  budgetCategories: PropTypes.array.isRequired,
  updateAccountData: PropTypes.func.isRequired,
  asyncHandleUpdateCategories: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
  handleAddTransaction: PropTypes.func.isRequired,
  toggleDemo: PropTypes.func.isRequired,
  isDemo: PropTypes.bool.isRequired
};
