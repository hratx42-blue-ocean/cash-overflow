const faker = require('faker');
module.exports.createData = () => {
  // create basic object structure
  const dummyObject = {
    // userID: faker.random.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    accounts: [],
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
  const frequencies = ['daily', 'weekly', 'monthly', 'yearly'];
  // create a variable number of accounts for each user to have, up to 6
  const accountCount = Math.ceil(Math.random() * 6);
  for (let i = 0; i < accountCount; i++) {
    dummyObject.accounts.push({
      name: faker.company.companyName(),
      type: faker.finance.accountName(),
      transactions: {
        2019: {
          6: [],
          7: [],
          8: []
        },
        2018: {
          6: [],
          7: [],
          8: []
        }
      }
    });
  }
  // seed June-August 2019 with 40 transactions each
  for (let year = 2019; year > 2017; year--) {
    for (let month = 6; month < 9; month++) {
      for (let h = 0; h < accountCount; h++) {
        for (let i = 0; i < 40; i++) {
          dummyObject.accounts[h].transactions[year][month].push({
            id: faker.random.uuid(),
            amount: faker.finance.amount(),
            category: categories[Math.floor(Math.random() * categories.length)],
            date: faker.date.between(
              `${year}-0${month}-01`,
              `${year}-0${month}-30`
            ),
            payee: faker.company.companyName(),
            recurring: faker.random.boolean()
          });
        }
      }
    }
  }
  // generate 5 recurring transactions
  for (let i = 0; i < 5; i++) {
    dummyObject.recurringTransactions.push({
      id: faker.random.uuid(),
      amount: faker.finance.amount(),
      category: categories[Math.floor(Math.random() * categories.length)],
      payee: faker.company.companyName(),
      startDate: faker.date.recent(30),
      frequency: frequencies[Math.floor(Math.random() * frequencies.length)]
    });
  }
  // generate budget categories with $0 allotments by default
  categories.forEach(category => {
    dummyObject.budgetCategories.push({
      id: faker.random.uuid(),
      name: category,
      allotment: {
        2019: {
          6: 0,
          7: 0,
          8: 0
        }
      }
    });
  });
  return dummyObject;
};
