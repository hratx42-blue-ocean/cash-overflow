import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  padding: {
    padding: theme.spacing(0, 2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const BudgetCategoryName = props => {
  const classes = useStyles();
  const [visible, setVisibility] = React.useState(false);

  function showDeleteCategoryButtons() {
    setVisibility(!visible);
  }

  function deleteCategory() {
    visible ? props.handleDeleteCategory(props.category) : null;
  }

  return (
    <Badge
      color="secondary"
      badgeContent="x"
      className={classes.padding}
      invisible={!visible}
      onClick={deleteCategory}
    >
      <span onClick={showDeleteCategoryButtons}>{props.category}</span>
    </Badge>
  );
};

BudgetCategoryName.propTypes = {
  category: PropTypes.string,
  handleDeleteCategory: PropTypes.func
};

export default BudgetCategoryName;
