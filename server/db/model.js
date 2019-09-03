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
  },
  types: () => {
    return connection
      .queryAsync('select * from account_types')
      .catch(console.error);
  },
  post: (name, balance, type, user) => {
    return connection
      .queryAsync(
        `
        insert into accounts
        (name, balance, type, user)
        values
        (?, ?, ?, ?)
        `,
        [name, balance, type, user]
      )
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
        select * from allotments where
          user = ${userId} and
          date like concat('${year}-${month}', '%')
        `
      )
      .catch(console.error);
  },
  post: (userid, category, date, amount, dateCat) => {
    return connection
      .queryAsync(
        `
        insert into allotments
          (user, category, date, amount, date_cat)
          values
          (?, ?, ?, ?, ?)
          on duplicate key update
          amount = values (amount)
        `,
        [userid, category, date, amount, dateCat]
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

module.exports = { users, accounts, categories, allotments, transactions };
