import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const TrendsOverview = props => {
  const labels = props.data.accountData.budgetCategories.map(
    category => category.name
  );
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setData(
      props.data.accountData.budgetCategories.map(category => {
        if (category.allotment[props.year]) {
          if (
            category.allotment[props.year][props.month] ||
            category.allotment[props.year][props.month] === 0
          ) {
            return category.allotment[props.year][props.month];
          }
        }
      })
    );
  }, [props.year, props.month]);

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
