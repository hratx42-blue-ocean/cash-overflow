import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const colors = [
  '#7ED957',
  '#00A48C',
  '#00858C',
  '#00E1FF',
  '#00A9E5',
  '#FF6F27',
  '#40493B',
  '#002E00',
  '#A4AE9E',
  '#FF217C'
];
const TrendsOverview = props => {
  const [labels, setLabels] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);
  const [categories, setCategories] = React.useState({});

  React.useEffect(() => {
    const cats = {};
    props.data.accountData.budgetCategories.forEach(
      (category, i) => (cats[category.name] = i > 9 ? i % 9 : i)
    );
    setCategories(cats);
  }, []);

  React.useEffect(() => {
    const transactions = {};
    props.data.accountData.accounts.map(account => {
      if (account.transactions[props.year]) {
        if (account.transactions[props.year][props.month]) {
          account.transactions[props.year][props.month].forEach(transaction => {
            if (transactions[transaction.category]) {
              transactions[transaction.category] += Number(transaction.amount);
            } else {
              transactions[transaction.category] = Number(transaction.amount);
            }
          });
        }
      }
    });
    setTransactions(transactions);
  }, [props.year, props.month, props.data.accountData.accounts]);

  React.useEffect(() => {
    setLabels(Object.keys(transactions).sort());
  }, [transactions]);

  React.useEffect(() => {
    setData(labels.map(label => Math.round(transactions[label] * 1000) / 1000));
  }, [labels, transactions]);

  const userData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: labels.map(name => colors[categories[name]])
      }
    ]
  };
  return <Doughnut data={userData} width={400} height={400}/>;
};

export default TrendsOverview;

TrendsOverview.propTypes = {
  data: PropTypes.object,
  month: PropTypes.string,
  year: PropTypes.string
};
