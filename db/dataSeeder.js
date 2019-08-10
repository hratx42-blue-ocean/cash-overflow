const faker = require('faker');

module.exports.createData = () => {
  const dummyObject = {
    userID: faker.random.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    accounts: [],
    recurringTransactions: [],
    budgetCategories: [],
    notifications: []
  };
  for (let i =0 ; )
  return dummyObject;
};
