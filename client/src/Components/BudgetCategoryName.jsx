import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  padding: {
    paddingLeft: 0,
    paddingTop: 0.6,
    paddingRight: 1.5,
    paddingBottom: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const BudgetCategoryName = ({ category, handleDeleteCategory }) => {
  const classes = useStyles();
  const [invisible, setVisibility] = useState(true);
  const [open, setOpen] = useState(false);

  function showDeleteCategoryButtons() {
    setVisibility(!invisible);
  }

  function handleDeleteDialog() {
    setOpen(!open);
  }

  function deleteCategory() {
    if (!invisible) {
      handleDeleteCategory(category);
      setVisibility(true);
    }
    handleDeleteDialog();
  }

  function handleClickAway() {
    setVisibility(true);
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <span onClick={showDeleteCategoryButtons}>{category}</span>
          <Badge
            color="secondary"
            badgeContent="x"
            className={classes.padding}
            invisible={invisible}
            onClick={handleDeleteDialog}
          />
        </div>
      </ClickAwayListener>
      <Dialog
        open={open}
        onClose={handleDeleteDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Delete Budget Category?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to delete ${category}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={deleteCategory} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

BudgetCategoryName.propTypes = {
  category: PropTypes.string,
  handleDeleteCategory: PropTypes.func
};

export default BudgetCategoryName;
