import React from 'react';
import { Bar } from 'react-chartjs-2';

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

const TrendsComparison = () => <Bar data={data} />;

export default TrendsComparison;
