const connection = require('./config');

const users = {
  byEmail: email => {
    return connection
      .queryAsync('select * from users where email = ?', email)
      .then(results => results[0])
      .catch(console.error);
  }
};

const accounts = {
  byUserId: userId => {
    return connection
      .queryAsync('select * from accounts where user = ?', userId)
      .catch(console.error);
  }
};

const categories = {
  byUserId: userId => {
    return connection
      .queryAsync('select id, name from categories where user = ?', userId)
      .catch(console.error);
  }
};

const allotments = {
  byUserIdAndDate: (userId, year, month) => {
    return connection
      .queryAsync(
        `
        select amount, category from allotments where
          user = ${userId} and
          date like concat('${year}-${month}', '%')
        `
      )
      .catch(console.error);
  }
};

const transactions = {
  byUserIdAndDate: (userId, year, month) => {
    return connection
      .queryAsync(
        `
        select * from transactions where
          user = ${userId} and
          date like concat('${year}-${month}', '%')
        `
      )
      .catch(console.error);
  },
  byCategoryAndDate: (userId, category, year, month) => {
    return connection
      .queryAsync(
        `
        select * from transactions where
          user = ${userId} and
          category = ${category} and
          date like concat('${year}-${month}', '%')
        `
      )
      .catch(console.error);
  },
  spentByCategoryAndDate: async (userId, category, year, month) => {
    const txs = await transactions.byCategoryAndDate(
      userId,
      category,
      year,
      month
    );
    return txs.reduce((sum, tx) => {
      // debit
      if (tx.type === 1) {
        return sum + tx.amount;
      }
      return sum - tx.amount;
    }, 0);
  },
  post: (account, amount, category, date, memo, recurring, type, user) => {
    return connection
      .queryAsync(
        `
        insert into transactions
        (account, amount, category, date, memo, recurring, type, user)
        values
        (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [account, amount, category, date, memo, recurring, type, user]
      )
      .catch(console.error);
  }
};

// users.byEmail('johnny.cash@cashoverflow.app').then(console.log);
// accounts.byUserId(1).then(console.log);
// categories.byUserId(1).then(console.log);
// allotments.byUserIdAndDate(1, '2019', '09').then(console.log);
transactions.spentByCategoryAndDate(1, 1, '2019', '09').then(console.log);

module.exports = { users, accounts, categories, allotments, transactions };
