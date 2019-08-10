const faker = require('faker');

module.exports.createData = () => {
  const dummyObject = {
    userID: faker.random.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    accounts: [
      {
        name: faker.company.companyName(),
        type: faker.finance.accountName(),
        transactions: {
          
        }
      },
      {}.
    ],
    recurringTransactions: [],
    budgetCategories: [],
    notifications: []
  };
  return dummyObject;
};
