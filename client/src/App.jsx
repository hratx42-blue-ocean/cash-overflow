import React, { Component } from 'react';
import axios from 'axios';

// Routing
import Container from '@material-ui/core/Container';
import { Auth0Context } from './react-auth0-wrapper';
import ProtectedSwitch from './Components/ProtectedSwitch.jsx';
import DemoSwitch from './Components/DemoSwitch.jsx';

// Custom Components
import ButtonAppBar from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import Loading from './Components/Loading.jsx';
import db from './utils/databaseRequests';

// import createFakeUser from './fakeUserGenerator.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: null,
      loadingUser: true,
      currentUser: '',
      budgetCategories: [],
      accountData: {
        accounts: [{ transactions: { year: { month: [] } } }]
      },
      isDemo: false
    };
    this.setAccountData = this.setAccountData.bind(this);
    this.handleAddTransaction = this.handleAddTransaction.bind(this);
    this.asyncHandleUpdateCategories = this.asyncHandleUpdateCategories.bind(
      this
    );
    this.toggleDemo = this.toggleDemo.bind(this);
  }

  getUserData(userEmail) {
    return axios.get(`/api/users/getData?user=${userEmail}`);
  }

  postUserData(userObject) {
    Axios.post('/api/users/upsertData', {
      userUpdate: userObject
    }).then(okResponse => console.log(okResponse));
  }

  componentDidMount() {
    const { isAuthenticated } = this.context;

    // if the user is unauthenticated, stop loading
    if (!isAuthenticated) {
      this.setState({
        loadingUser: false
      });
    }
  }

  componentDidUpdate() {
    const { user } = this.context;

    // See if a user has authenticated
    if (user && user.sub.substring(6) !== this.state.userID) {
      console.log(`Looks like you're logged in as: ${user.email}`);

      // set the userID to the UUID provided
      const userID = user.sub.substring(6);
      console.log(`Your UserID is ${userID}`);
      this.setState(
        {
          userID,
          loadingUser: true
        },
        // check to see if the user exists in the database
        async () => {
          const response = await db.getUserData(userID);

          const { data: userData } = response;

          // if they exist, set their data in state
          if (userData.length > 0) {
            this.setAccountData(userData[0]);
            console.log(`Welcome back ${userData[0].firstName}!`);
          } else {
            // give the demo data if they don't exit
            console.log(`Welcome to CashOverflow!`);
            // TODO: Fake user data should be replaced with SignUp flow logic.
            // const newUserData = createFakeUser();

            console.log(
              `We'll give you some sample data based on the average American's to get you started.`
            );
            // newUserData.email = user.email;
            // newUserData.userID = userID;

            // this.setAccountData(newUserData);
          }
        }
      );
    }
  }

  setAccountData(newAccountData) {
    const { budgetCategories, email } = newAccountData;
    this.setState(
      {
        accountData: newAccountData,
        budgetCategories,
        currentUser: email
      },
      () => {
        this.setState({ loadingUser: false }, () => {
          db.postUserData(this.state.accountData);
        });
      }
    );
  }

  toggleDemo() {
    db.getUserData('Ihearthetrainacomin')
      .then(result => {
        this.setAccountData(result.data[0]);
      })
      .then(() => {
        if (!this.state.isDemo) {
          this.setState({
            isDemo: true,
            loadingUser: false
          });
          console.log('demo mode now on');
        } else {
          this.setState(
            {
              isDemo: false,
              loadingUser: false
            },
            () => console.log('demo mode turned off')
          );
        }
      });
  }

  handleAddTransaction(stateObject) {
    // this function will live at the dashboard level eventually

    const {
      inputAccount,
      inputAmount,
      inputCategory,
      inputDate,
      inputPayee
    } = stateObject;
    const month = inputDate._d.getMonth();
    const year = inputDate._d.getFullYear();
    const accountUpdate = { ...this.state.accountData };
    const { accounts } = accountUpdate;

    const transaction = {
      id: (420420420420420 + Math.floor(Math.random() * 69696969)).toString(),
      amount: inputAmount,
      category: inputCategory,
      date: inputDate._d,
      payee: inputPayee,
      recurring: false
    };
    console.log(transaction);

    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].name === inputAccount) {
        accountUpdate.accounts[i].transactions[year][month - 1].push(
          transaction
        );
        break;
      }
      this.setAccountData(accountUpdate);
    }

    this.setState({
      currentUser: accountUpdate
    });

    // fn below will update app state, and then POST updated userObject to DB

    this.setAccountData(accountUpdate);
  }

  promisifySetState(userObject) {
    return new Promise(resolve => {
      this.setState(
        {
          accountData: userObject,
          budgetCategories: userObject.budgetCategories
        },
        () => {
          const { accountData } = this.state;
          resolve(accountData);
        }
      );
    });
  }

  /**
   * WARNING WARNING WARNING
   * This is a major antipattern, we are aware.
   * Somewhere in the complex finanical calcuations, the alloment relays on state and not props, so it's not update as props change.
   * We're not sure where that happens and we plan to refactor finanical calucations to the backend shortly,
   * making this abomination moot.
   */

  asyncHandleUpdateCategories(updatedCategories, callback) {
    const accountUpdate = { ...this.state.accountData };
    accountUpdate.budgetCategories = updatedCategories;
    this.promisifySetState(accountUpdate)
      .then(updatedAccount => {
        const { budgetCategories, accounts } = updatedAccount;
        callback(budgetCategories, accounts);
        this.setAccountData(updatedAccount);
      })
      .catch(err => {
        console.log('category update error: ', err);
      });
  }

  render() {
    const {
      accountData,
      budgetCategories,
      isDemo,
      currentUser,
      loadingUser
    } = this.state;
    const { isAuthenticated } = this.context;
    console.log('is authenticated is: ', isAuthenticated);
    if (loadingUser) {
      return (
        <div data-testid="loading-user">
          <Loading />
        </div>
      );
    }

    return (
      <div className="app">
        <Container>
          <ButtonAppBar isDemo={isDemo} toggleDemo={this.toggleDemo} />
          {isDemo ? (
            <DemoSwitch
              accountData={accountData}
              budgetCategories={budgetCategories}
              updateAccountData={this.setAccountData}
              asyncHandleUpdateCategories={this.asyncHandleUpdateCategories}
              currentUser={currentUser}
              handleAddTransaction={this.handleAddTransaction}
              toggleDemo={this.toggleDemo}
              isDemo={isDemo}
              loading={false}
              isAuthenticated
            />
          ) : (
            <ProtectedSwitch
              accountData={accountData}
              budgetCategories={budgetCategories}
              updateAccountData={this.setAccountData}
              asyncHandleUpdateCategories={this.asyncHandleUpdateCategories}
              currentUser={currentUser}
              handleAddTransaction={this.handleAddTransaction}
              toggleDemo={this.toggleDemo}
              isDemo={isDemo}
            />
          )}
        </Container>
        <Footer />
      </div>
    );
  }
}
App.contextType = Auth0Context;
