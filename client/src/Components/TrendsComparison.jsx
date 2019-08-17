import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
// test data for display
const month = new Array();
month[0] = 'January';
month[1] = 'February';
month[2] = 'March';
month[3] = 'April';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'August';
month[8] = 'September';
month[9] = 'October';
month[10] = 'November';
month[11] = 'December';
const TrendsComparison = props => {
  const [m1Data, setm1Data] = React.useState({});
  const [m2Data, setm2Data] = React.useState({});
  const [categories, setCategories] = React.useState({});
  const [graphData, setGraphData] = React.useState({});

  React.useEffect(() => {
    const cat1 = {};
    const cat2 = {};
    const totalCats = {};
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
  }, [props.data.accountData.accounts, props.m1, props.m2, props.y1, props.y2]);

  React.useEffect(() => {
    setGraphData({
      labels: Object.keys(categories).sort(),
      datasets: [
        {
          label: month[props.m1] + ' ' + props.y1 || 1,
          data: Object.keys(categories)
            .sort()
            .map(cat => (m1Data[cat] ? m1Data[cat].toFixed(2) : 0)),
          backgroundColor: '#B24C63'
        },
        {
          label: month[props.m2] + ' ' + props.y2 || 2,
          data: Object.keys(categories)
            .sort()
            .map(cat => (m2Data[cat] ? m2Data[cat].toFixed(2) : 0)),
          backgroundColor: '#58355E'
        }
      ]
    });
  }, [m1Data, m2Data, categories]);
  return <Bar data={graphData} width={400} height={400}/>;
};

export default TrendsComparison;

TrendsComparison.propTypes = {
  data: PropTypes.object,
  m1: PropTypes.string,
  m2: PropTypes.string,
  y1: PropTypes.string,
  y2: PropTypes.string
};
