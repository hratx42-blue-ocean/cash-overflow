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

export default function ProtectedSwitch(props) {
  const {
    accountData,
    budgetCategories,
    updateAccountData,
    currentUser,
    handleAddTransaction,
    toggleDemo,
    isDemo,
    isAuthenticated,
    loading
  } = props;

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          !isAuthenticated ? (
            <LandingPage toggleDemo={toggleDemo} />
          ) : (
            <Redirect to="/dashboard" />
          )
        }
      />
      <PrivateRoute
        path="/accounts"
        render={props => (
          <AccountsPage
            {...props}
            accountData={accountData}
            loading={loading}
            isAuthenticated={isAuthenticated}
            updateAccountData={updateAccountData}
          />
        )}
      />
      <PrivateRoute
        path="/budget"
        render={props => (
          <BudgetPage
            accounts={accountData.accounts}
            categories={budgetCategories}
            loading={loading}
            isAuthenticated={isAuthenticated}
            updateAccountData={updateAccountData}
          />
        )}
      />
      <PrivateRoute
        path="/dashboard"
        render={props => (
          <DashboardPage
            {...props}
            handleAddTransaction={handleAddTransaction}
            accountData={accountData}
            currentUser={currentUser}
            loading={loading}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
      <PrivateRoute
        path="/profile"
        render={props => (
          <ProfilePage
            {...props}
            accountData={accountData}
            loading={loading}
            isAuthenticated={isAuthenticated}
            updateAccountData={updateAccountData}
          />
        )}
      />
      <PrivateRoute
        path="/trends"
        render={props => (
          <TrendsPage
            {...props}
            accountData={accountData}
            loading={loading}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
      <Route component={ErrorPage} />
    </Switch>
  );
}

ProtectedSwitch.propTypes = {
  accountData: PropTypes.object.isRequired,
  budgetCategories: PropTypes.array.isRequired,
  updateAccountData: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
  handleAddTransaction: PropTypes.func.isRequired,
  toggleDemo: PropTypes.func.isRequired,
  isDemo: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};
