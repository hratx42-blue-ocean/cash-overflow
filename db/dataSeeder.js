const faker = require('faker');

module.exports.createData = () => {
  // create basic object structure
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
          2019: {
            8: []
          }
        }
      }
    ],
    recurringTransactions: [],
    budgetCategories: [],
    notifications: []
  };
  const categories = [
    'rent',
    'groceries',
    'transportation',
    'bills',
    'clothes',
    'going out',
    'household expenses'
  ];

  // seed August 2019 with 40 transactions
  for (let i = 0; i < 40; i++) {
    dummyObject.accounts[0].transactions[2019][8].push({
      id: faker.random.uuid(),
      amount: faker.finance.amount(),
      category: categories[Math.floor(Math.random() * categories.length)],
      date: faker.date.between('2019-08-01', '2019-08-31'),
      payee: faker.company.companyName(),
      recurring: faker.random.boolean()
    });
  }

  // generate 5 recurring transactions
  for (let i = 0; i < 5; i++) {
    dummyObject.recurringTransactions.push({
      id: faker.random.uuid(),
      amount: faker.finance.amount(),
      category: categories[Math.floor(Math.random() * categories.length)],
      payee: faker.company.companyName(),
      startDate: faker.date.recent(30),
      frequency: faker.random.
    });
  }
  return dummyObject;
};
