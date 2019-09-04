const filterTxs = (transactions, targetDate) => {
  const targetYearMonth = targetDate.format('YYYY-MM');
  return transactions.filter(tx => {
    const { date } = tx;
    const [yearMonth] = date.match(/^(\d+-\d+)/g);
    return yearMonth === targetYearMonth;
  });
};

module.exports = filterTxs;
