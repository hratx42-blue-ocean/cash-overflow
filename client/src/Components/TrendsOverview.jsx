import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
// test data for display
const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
};

const TrendsOverview = props => {
  const labels = props.data.accountData.budgetCategories.map(
    category => category.name
  );
  const data = props.data.accountData.budgetCategories.map(
    category => category.allotment[2019][6]
  );
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
  data: PropTypes.object
};
