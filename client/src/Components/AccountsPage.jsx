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
      currentYear: 0
    };

    this.handleAddAccount = this.handleAddAccount.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAccountFilter = this.handleAccountFilter.bind(this);
    this.handleLeftArrow = this.handleLeftArrow.bind(this);
    this.handleRightArrow = this.handleRightArrow.bind(this);
  }

  componentDidMount(){
    let currentDate = new Date();
    this.setState({
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear()
    })
  }

  handleAddAccount() {
    this.setState({ open: true });
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

  handleLeftArrow(){
    this.setState({ currentMonth: this.state.currentMonth - 1})
    
  }

  handleRightArrow(){
    this.setState({ currentMonth: this.state.currentMonth + 1})
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
      accountData.accounts[0].transactions[this.state.currentYear][this.state.currentMonth]
    ) {
      
      if(this.state.accountFilter === ''){
        accountData.accounts.forEach(account => {
          let txs = account.transactions[this.state.currentYear][this.state.currentMonth];
          txs.forEach(record => {
            record.accountName = account.name
          })
          data.push(...txs);
        });
      } else {
        accountData.accounts.forEach(account => {
          console.log(account.name === this.state.accountFilter)
          if(account.name === this.state.accountFilter){
            let txs = account.transactions[this.state.currentYear][this.state.currentMonth];
            txs.forEach(record => {
              record.accountName = account.name
            })
            data.push(...txs);
          }
        });
      }   
      data = data.sort((a, b) => b.date - a.date);
      accountsList = accountData.accounts;
    }
    return (
      <div>
        <h1>Accounts</h1>
        <Grid container spacing={3}>
          <AccountsTable
            accountData={this.props.accountData}
            handleAddAccount={this.handleAddAccount}
            handleClose={this.handleClose}
            handleSelect={this.handleSelect}
            accountType={this.state.accountType}
            open={this.state.open}
          />
          <AccountTransactions
            data={data}
            accountsList={accountsList}
            accountFilter={this.state.accountFilter}
            handleAccountFilter={this.handleAccountFilter}
            currentMonth = {Number(this.state.currentMonth)}
            currentYear = {Number(this.state.currentYear)}
            handleLeftArrow = {this.handleLeftArrow}
            handleRightArrow = {this.handleRightArrow}
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
