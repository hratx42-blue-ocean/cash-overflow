import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import BudgetCategory from './BudgetCategory.jsx';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'purple',
    color: 'white',
    flexGrow: 1,
    borderRadius: 6,
    textAlign: 'center'
  },
  item: {
    backgroundColor: 'purple'
  }
}));

export default function Budget(props) {
  console.log('categories are: ', props.categories);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid container direction="row">
          <Grid item xs={3}>
            <span textAlign> Category</span>
          </Grid>
          <Grid item xs={3}>
            Remaining $
          </Grid>
          <Grid item xs={3}>
            Alloted $
          </Grid>
          <Grid item xs={3}>
            Spent $
          </Grid>
          {props.categories.map((category, i) => (
            <BudgetCategory
              name={category.name}
              allotment={[category.allotment]}
              key={`category${i}`}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

Budget.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object)
};
