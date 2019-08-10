import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

export default function BudgetCategory(props) {
  return (
    <Grid container direction="row">
      <Grid item xs={3}>
        <span textAlign>{props.name}</span>
      </Grid>
      <Grid item xs={3}>
        0
      </Grid>
      <Grid item xs={3}>
        {props.allotment[0]['2019']['6']}
      </Grid>
      <Grid item xs={3}>
        0
      </Grid>
    </Grid>
  );
}

BudgetCategory.propTypes = {
  name: PropTypes.string,
  allotment: PropTypes.arrayOf(PropTypes.object)
};
