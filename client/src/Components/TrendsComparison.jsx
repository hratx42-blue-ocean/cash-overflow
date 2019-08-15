import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
// test data for display

const TrendsComparison = props => {
  const [m1Data, setm1Data] = React.useState({});
  const [m2Data, setm2Data] = React.useState({});
  const [categories, setCategories] = React.useState({});
  const [graphData, setGraphData] = React.useState({});

  React.useEffect(() => {
    let cat1 = {};
    let cat2 = {};
    let totalCats = {};
    props.data.accountData.accounts.forEach(account => {
      if (account.transactions[props.y1]) {
        if (account.transactions[props.y1][props.m1]) {
          account.transactions[props.y1][props.m1].forEach(transaction => {
            if (cat1[transaction.category]) {
              cat1[transaction.category] += Number(transaction.amount);
            } else {
              cat1[transaction.category] = Number(transaction.amount);
              totalCats[transaction.category] = 1;
            }
          });
        }
      }
      if (account.transactions[props.y2]) {
        if (account.transactions[props.y2][props.m2]) {
          account.transactions[props.y2][props.m2].forEach(transaction => {
            if (cat2[transaction.category]) {
              cat2[transaction.category] += Number(transaction.amount);
            } else {
              cat2[transaction.category] = Number(transaction.amount);
              totalCats[transaction.category] = 1;
            }
          });
        }
      }
    });
    setm1Data(cat1);
    setm2Data(cat2);
    setCategories(totalCats);
  }, [props.m1, props.m2, props.y1, props.y2]);

  React.useEffect(() => {
    setGraphData({
      labels: Object.keys(categories).sort(),
      datasets: [
        {
          label: 'Month 1',
          data: Object.keys(categories)
            .sort()
            .map(cat => m1Data[cat] || 0),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        },
        {
          label: 'Month 2',
          data: Object.keys(categories)
            .sort()
            .map(cat => m2Data[cat] || 0),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    });
  }, [m1Data, m2Data, categories]);
  return <Bar data={graphData} />;
};

export default TrendsComparison;

TrendsComparison.propTypes = {
  data: PropTypes.object,
  m1: PropTypes.string,
  m2: PropTypes.string,
  y1: PropTypes.string,
  y2: PropTypes.string
};
