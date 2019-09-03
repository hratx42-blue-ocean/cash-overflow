import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Today from '@material-ui/icons/Today';
import IconButton from '@material-ui/core/IconButton';
import Loading from './Loading';
import AccountTransactions from './AccountTransactions';
import AccountsTable from './AccountsTable';
import AccountsDialog from './AccountsDialog';
import db from '../utils/databaseRequests';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    flexGrow: 1
  },
  jumbotron: {
    marginTop: '50px',
    textAlign: 'center'
  }
}));

const AccountsPage = ({
  user,
  accounts,
  transactions,
  targetDate,
  handleMonthChange,
  pushNewItem,
  loading,
  isAuthenticated
}) => {
  // dialog state
  const [open, setOpen] = useState(false);
  const [dialogTab, setDialogTab] = useState(0);
  const [accountTypes, setAccountTypes] = useState([]);
  const [accountTypeNames, setAccountTypeNames] = useState();

  const classes = useStyles();

  // on mount, get account type names and map for lookup
  useEffect(() => {
    if (accountTypeNames === undefined) {
      db.getUserAccountTypes()
        .then(({ data }) => {
          const mapped = {};
          setAccountTypes(data);
          data.forEach(type => {
            mapped[type.id] = type;
          });
          return mapped;
        })
        .then(mapped => {
          setAccountTypeNames(mapped);
        })
        .catch(console.error);
    }
  });

  const handleOpenDialog = () => {
    setOpen(!open);
  };

  if (loading || !isAuthenticated) {
    return (
      <div data-testid="auth-loading">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <AccountsDialog
        user={user}
        accountTypes={accountTypes}
        accountTypeNames={accountTypeNames}
        handleOpenDialog={handleOpenDialog}
        pushNewItem={pushNewItem}
        open={open}
        dialogTab={dialogTab}
        setDialogTab={setDialogTab}
      />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={5}
      >
        <Grid item xs={12} className={classes.jumbotron}>
          <Typography variant="h2" gutterBottom>
            {`Your activity for ${targetDate.format('MMMM, YYYY')}`}
          </Typography>
          <IconButton
            onClick={() => handleMonthChange(1)}
            aria-label="previous-month"
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={() => handleMonthChange()}
            aria-label="previous-month"
          >
            <Today />
          </IconButton>
          <IconButton
            onClick={() => handleMonthChange(-1)}
            aria-label="next-month"
          >
            <ChevronRight />
          </IconButton>
        </Grid>
        <Grid item sm={12} md={5}>
          <AccountsTable
            accounts={accounts}
            handleOpenDialog={handleOpenDialog}
            names={accountTypeNames}
            setDialogTab={setDialogTab}
          />
        </Grid>
        <Grid item sm={12} md={7}>
          <AccountTransactions
            handleOpenDialog={handleOpenDialog}
            transactions={transactions}
            targetDate={targetDate}
            setDialogTab={setDialogTab}
          />
        </Grid>
      </Grid>
    </div>
  );
};

AccountsPage.propTypes = {
  accountData: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default AccountsPage;
