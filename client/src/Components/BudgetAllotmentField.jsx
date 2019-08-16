import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: 0,
    width: 40
  }
}));

const BudgetAllotmentField = ({ handleClickAway, handleKeyPress }) => {
  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <TextField
        id="standard-number"
        className={classes.textField}
        defaultValue="0"
        margin="none"
        onKeyPress={handleKeyPress}
      />
    </ClickAwayListener>
  );
};

export default BudgetAllotmentField;
