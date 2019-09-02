import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import { Auth0Context } from '../react-auth0-wrapper';
import Header from './Header.jsx';
import AccountsPage from './AccountsPage.jsx';
import BudgetPage from './BudgetPage.jsx';
import DashboardPage from './DashboardPage.jsx';
import LandingPage from './LandingPage.jsx';
import TrendsPage from './TrendsPage.jsx';
import LoginPage from './LoginPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import ErrorPage from './ErrorPage.jsx';
import PropTypes from 'prop-types';

export default function DemoSwitch(props) {
  const {
    user,
    accounts,
    accountTotalBal,
    categories,
    transactions,
    targetDate,
    accountData,
    budgetCategories,
    updateAccountData,
    asyncHandleUpdateCategories,
    currentUser,
    handleAddTransaction,
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
            accountTotalBal={accountTotalBal}
            categories={categories}
            transactions={transactions}
            targetDate={targetDate}
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
            accountTotalBal={accountTotalBal}
            categories={categories}
            transactions={transactions}
            handleAddTransaction={handleAddTransaction}
            accountData={accountData}
            currentUser={currentUser}
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
