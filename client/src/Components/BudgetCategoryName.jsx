import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
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
  const [invisible, setVisibility] = useState(true);

  function showDeleteCategoryButtons() {
    setVisibility(!invisible);
  }

  function deleteCategory() {
    invisible ? null : props.handleDeleteCategory(props.category);
    setVisibility(true);
  }

  function handleClickAway() {
    setVisibility(true);
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Badge
          color="secondary"
          badgeContent="x"
          className={classes.padding}
          invisible={invisible}
          onClick={deleteCategory}
        >
          <span onClick={showDeleteCategoryButtons}>{props.category}</span>
        </Badge>
      </ClickAwayListener>
    </>
  );
};

BudgetCategoryName.propTypes = {
  category: PropTypes.string,
  handleDeleteCategory: PropTypes.func
};

export default BudgetCategoryName;
