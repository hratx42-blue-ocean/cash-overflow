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
    padding: theme.spacing(0, 0.6, 1.5, 1)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const BudgetCategoryName = ({
  category,
  handleDeleteCategory,
  handleDeleteDialog,
  handleClose,
  open
}) => {
  const classes = useStyles();
  const [invisible, setVisibility] = useState(true);

  function showDeleteCategoryButtons() {
    setVisibility(!invisible);
  }

  function deleteCategory() {
    if (!invisible) {
      handleDeleteCategory(category);
      setVisibility(true);
    }
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
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Delete Budget Category?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to delete ${category}?`}:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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
  open: PropTypes.bool,
  handleDeleteCategory: PropTypes.func,
  handleDeleteDialog: PropTypes.func,
  handleClose: PropTypes.func
};

export default BudgetCategoryName;
