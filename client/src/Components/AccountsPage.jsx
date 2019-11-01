import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AccountsTable from './AccountsTable.jsx';
import AccountTransactions from './AccountTransactions.jsx';
import Loading from './Loading.jsx';

export default class AccountsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      accountType: '',
      accountFilter: '',
      currentMonth: 0,
      currentYear: 0,
      accountName: ''
    };

    this.handleAddAccount = this.handleAddAccount.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAccountFilter = this.handleAccountFilter.bind(this);
    this.handleLeftArrow = this.handleLeftArrow.bind(this);
    this.handleRightArrow = this.handleRightArrow.bind(this);
    this.handleSaveAccount = this.handleSaveAccount.bind(this);
    this.handleAccountNameInput = this.handleAccountNameInput.bind(this);
  }

  componentDidMount() {
    const currentDate = new Date();
    this.setState({
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear()
    });
  }

  handleAddAccount() {
    this.setState({ open: true });
  }

  handleAccountNameInput(event) {
    this.setState({ accountName: event.target.value });
  }

  handleSaveAccount() {
    this.setState({ open: false });
    console.log(this.state.accountName, this.state.accountType);
    const accountDataUpdate = JSON.parse(
      JSON.stringify(this.props.accountData)
    );
    const newAcct = {
      name: this.state.accountName,
      transactions: { '2019': { '6': [], '7': [], '8': [] } },
      type: this.state.accountType
    };
    accountDataUpdate.accounts.push(newAcct);

    this.props.setAccountData(accountDataUpdate);
  }

  handleClose() {
    this.setState({ open: false });
    console.log(this.props.accountData.accounts);
  }

  handleSelect(event) {
    this.setState({ accountType: event.target.value });
  }

  handleAccountFilter(event) {
    this.setState({ accountFilter: event.target.value });
  }

  handleLeftArrow() {
    if (this.state.currentMonth > 1) {
      this.setState({ currentMonth: this.state.currentMonth - 1 }, () =>
        console.log(this.state.currentMonth)
      );
    }
  }

  handleRightArrow() {
    if (this.state.currentMonth < 12) {
      this.setState({ currentMonth: this.state.currentMonth + 1 }, () =>
        console.log(this.state.currentMonth)
      );
    }
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

    const { accountData } = this.props;
    let data = [];
    let accountsList = [];
    if (
      accountData &&
      accountData.accounts[0] &&
      accountData.accounts[0].transactions &&
      accountData.accounts[0].transactions[this.state.currentYear] &&
      accountData.accounts[0].transactions[this.state.currentYear][
        this.state.currentMonth
      ]
    ) {
      if (this.state.accountFilter === '') {
        accountData.accounts.forEach(account => {
          if (
            account.transactions[this.state.currentYear] &&
            account.transactions[this.state.currentYear][
              this.state.currentMonth
            ]
          ) {
            const txs =
              account.transactions[this.state.currentYear][
                this.state.currentMonth
              ];
            if (txs.length > 0) {
              txs.forEach(record => {
                record.accountName = account.name;
              });
              data.push(...txs);
            }
          }
        });
      } else {
        accountData.accounts.forEach(account => {
          if (
            account.name === this.state.accountFilter &&
            account.transactions[this.state.currentYear] &&
            account.transactions[this.state.currentYear][
              this.state.currentMonth
            ]
          ) {
            const txs =
              account.transactions[this.state.currentYear][
                this.state.currentMonth
              ];
            if (txs.length > 0) {
              txs.forEach(record => {
                record.accountName = account.name;
              });
              data.push(...txs);
            }
          }
        });
      }
      data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      accountsList = accountData.accounts;
    }
    return (
      <div>
        <Grid container spacing={3}>
          <AccountsTable
            accountData={this.props.accountData}
            handleAddAccount={this.handleAddAccount}
            handleClose={this.handleClose}
            handleSelect={this.handleSelect}
            accountType={this.state.accountType}
            open={this.state.open}
            handleAccountNameInput={this.handleAccountNameInput}
            handleSaveAccount={this.handleSaveAccount}
          />
          <AccountTransactions
            data={data}
            accountsList={accountsList}
            accountFilter={this.state.accountFilter}
            handleAccountFilter={this.handleAccountFilter}
            currentMonth={Number(this.state.currentMonth)}
            currentYear={Number(this.state.currentYear)}
            handleLeftArrow={this.handleLeftArrow}
            handleRightArrow={this.handleRightArrow}
          />
        </Grid>
      </div>
    );
  }
}

AccountsPage.propTypes = {
  accountData: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};
