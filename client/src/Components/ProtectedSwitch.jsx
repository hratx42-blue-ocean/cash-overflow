import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import { useAuth0 } from '../react-auth0-wrapper';
import AccountsPage from './Accounts/AccountsPage';
import BudgetPage from './Budget/BudgetPage';
import DashboardPage from './Dashboard/DashboardPage';
import LandingPage from './LandingPage';
import TrendsPage from './TrendsPage';
import ProfilePage from './ProfilePage';
import ErrorPage from './ErrorPage';

export default function ProtectedSwitch(props) {
  const {
    accountData,
    budgetCategories,
    updateAccountData,
    asyncHandleUpdateCategories,
    currentUser,
    handleAddTransaction,
    toggleDemo
  } = props;

  const { isAuthenticated, loading } = useAuth0();

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
      <Route
        path="/home"
        render={() => <LandingPage toggleDemo={toggleDemo} />}
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
            {...props}
            accounts={accountData.accounts}
            categories={budgetCategories}
            loading={loading}
            isAuthenticated={isAuthenticated}
            updateAccountData={updateAccountData}
            asyncHandleUpdateCategories={asyncHandleUpdateCategories}
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
  asyncHandleUpdateCategories: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
  handleAddTransaction: PropTypes.func.isRequired,
  toggleDemo: PropTypes.func.isRequired,
  isDemo: PropTypes.bool.isRequired
};
