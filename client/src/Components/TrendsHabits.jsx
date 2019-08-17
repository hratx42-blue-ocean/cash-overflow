import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

// test data for display
const numToMonths = [
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
const date = new Date();
const currentYear = date.getFullYear();

const TrendsHabits = props => {
  const [category, setCategory] = React.useState([{ name: '' }]);
  const [graphData, setGraph] = React.useState({});
  const [months, setMonths] = React.useState([]);
  const [years, setYears] = React.useState([]);

  React.useEffect(() => {
    setCategory(
      props.data.accountData.budgetCategories.filter(category => {
        return category.name == props.category;
      })
    );
  }, [props.category, props.data.accountData.budgetCategories]);

  React.useEffect(() => {
    if (props.view === 'month' && category.length > 0) {
      const possibleMonths = {};
      props.data.accountData.accounts.map(account => {
        Object.keys(account.transactions[currentYear]).map(month => {
          if (possibleMonths[month]) {
            possibleMonths[month] += account.transactions[currentYear][
              month
            ].reduce((x, y) => {
              if (y.category === category[0].name) {
                return x + Number(y.amount);
              }
              return x + 0;
            }, 0);
          } else {
            possibleMonths[month] = account.transactions[currentYear][
              month
            ].reduce((x, y) => {
              if (y.category === category[0].name) {
                return x + Number(y.amount);
              }
              return x + 0;
            }, 0);
          }
        });
        setMonths(possibleMonths);
      });
    } else if (category.length > 0) {
      const possibleYears = {};
      props.data.accountData.accounts.map(account => {
        Object.keys(account.transactions).map(year => {
          const possibleMonths = {};
          Object.keys(account.transactions[year]).map(month => {
            if (possibleMonths[month]) {
              possibleMonths[month] += account.transactions[year][month].reduce(
                (x, y) => {
                  if (y.category === category[0].name) {
                    return x + Number(y.amount);
                  }
                  return x + 0;
                },
                0
              );
            } else {
              possibleMonths[month] = account.transactions[year][month].reduce(
                (x, y) => {
                  if (y.category === category[0].name) {
                    return x + Number(y.amount);
                  }
                  return x + 0;
                },
                0
              );
            }
          });
          let total = 0;
          Object.keys(possibleMonths).forEach(
            month => (total += possibleMonths[month])
          );
          if (possibleYears[year]) {
            possibleYears[year] += total;
          } else {
            possibleYears[year] = total;
          }
        });
      });
      setYears(possibleYears);
    }
  }, [category, props.data.accountData.accounts, props.view]);

  React.useEffect(() => {
    if (category) {
      if (category[0]) {
        if (category[0].name) {
          if (props.view === 'month') {
            const numbers = Object.keys(months);
            setGraph({
              labels: numbers.map(num => numToMonths[num]),
              datasets: [
                {
                  label: category[0].name,
                  data: numbers.map(num => months[num].toFixed(2)),
                  backgroundColor: 'rgba(88, 53, 95, 0.8)'
                }
              ]
            });
          } else {
            const numbers = Object.keys(years);
            setGraph({
              labels: numbers,
              datasets: [
                {
                  label: category[0].name,
                  data: numbers.map(num => years[num].toFixed(2)),
                  backgroundColor: 'rgba(179, 77, 100, 0.8)'
                }
              ]
            });
          }
        }
      }
    }
  }, [months, years, props.view, category]);

  return <Line data={graphData} width={400} height={400}/>;
};
export default TrendsHabits;

TrendsHabits.propTypes = {
  data: PropTypes.object,
  view: PropTypes.string,
  category: PropTypes.string
};
