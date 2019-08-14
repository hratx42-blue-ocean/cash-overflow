import React from 'react';
import { Line } from 'react-chartjs-2';

// test data for display
const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      lineTension: 0
    }
  ]
};

const TrendsHabits = () => <Line data={data} />;

export default TrendsHabits;
