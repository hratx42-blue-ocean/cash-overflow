import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const colors = [
  '#880E4F',
  '#B5364E',
  '#D9624A',
  '#F09248',
  '#FBC452',
  '#79457B',
  '#374C6D',
  '#678434',
  '#009B95',
  '#9D3A6B',
  '#00C9B9',
  '#5CC68E',
  '#8CDA83',
  '#FA7484',
  '#FF9A6E'
];
const TrendsOverview = props => {
  const [labels, setLabels] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);
  const [categories, setCategories] = React.useState({});

  React.useEffect(() => {
    const cats = {};
    props.data.accountData.budgetCategories.forEach(
      (category, i) => (cats[category.name] = i > 14 ? i % 14 : i)
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
