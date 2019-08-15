import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

// test data for display
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      lineTension: 0
    }
  ],
  options: {
    title: 'test'
  }
};
const TrendsHabits = props => {
  const [categoryData, setCategory] = React.useState([]);
  const [graphData, setGraph] = React.useState(data);

  React.useEffect(() => {
    setCategory(
      props.data.accountData.budgetCategories.filter(category => {
        return category.name == props.category;
      })
    );
  }, [props.category]);

  React.useEffect(() => {
    if (props.view === 'month' && categoryData.length > 0) {
      console.log(categoryData);
      let numbers = Object.keys(categoryData[0].allotment[2019]);
      setGraph({
        labels: numbers.map(num => months[num]),
        datasets: [
          {
            data: numbers.map(month => categoryData[0].allotment[2019][month])
          }
        ]
      });
    } else {
      console.log('yearly view');
    }
  }, [categoryData]);

  return <Line data={graphData} />;
};

export default TrendsHabits;

TrendsHabits.propTypes = {
  data: PropTypes.object,
  view: PropTypes.string,
  category: PropTypes.string
};
