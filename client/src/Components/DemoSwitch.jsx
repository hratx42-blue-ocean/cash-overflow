import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Auth0Context } from '../react-auth0-wrapper';
import Header from './Header';
import AccountsPage from './AccountsPage';
import BudgetPage from './BudgetPage';
import DashboardPage from './DashboardPage';
import LandingPage from './LandingPage';
import TrendsPage from './TrendsPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import ErrorPage from './ErrorPage';
import PropTypes from 'prop-types';

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
      {/* <Route
        path="/budget"
        render={props => (
          <BudgetPage
            {...props}
            accounts={accountData.accounts}
            categories={budgetCategories}
            updateAccountData={updateAccountData}
            asyncHandleUpdateCategories={asyncHandleUpdateCategories}
            loading={loading}
            isAuthenticated={isAuthenticated}
          />
        )}
      /> */}
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
