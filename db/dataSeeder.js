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
            6: [],
            7: [],
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
  const frequencies = ['daily', 'weekly', 'monthly', 'yearly'];

  // seed June-August 2019 with 40 transactions each
  for (let month = 6; month < 9; month++) {
    for (let i = 0; i < 40; i++) {
      dummyObject.accounts[0].transactions[2019][month].push({
        id: faker.random.uuid(),
        amount: faker.finance.amount(),
        category: categories[Math.floor(Math.random() * categories.length)],
        date: faker.date.between(`2019-0${month}-01`, `2019-0${month}-30`),
        payee: faker.company.companyName(),
        recurring: faker.random.boolean()
      });
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
