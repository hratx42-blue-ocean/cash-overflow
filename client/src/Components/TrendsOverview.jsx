import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const TrendsOverview = props => {
  const [labels, setLabels] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    let transactions = {};
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
  }, [props.year, props.month]);

  React.useEffect(() => {
    setLabels(Object.keys(transactions));
  }, [transactions]);

  React.useEffect(() => {
    setData(labels.map(label => Math.round(transactions[label] * 1000) / 1000));
  }, [labels]);

  const userData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };
  return <Doughnut data={userData} />;
};

export default TrendsOverview;

TrendsOverview.propTypes = {
  data: PropTypes.object,
  month: PropTypes.string,
  year: PropTypes.string
};
