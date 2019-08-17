import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const BudgetAddCategory = ({
  open,
  handleAddCategory,
  handleSaveCategory,
  handleClose,
  handleTextInput
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="row" spacing={1}>
        <Grid item>
          <Typography>Category</Typography>
        </Grid>
        <Grid item>
          <Icon
            color="primary"
            onClick={handleAddCategory}
            aria-label="add-budget-category"
          >
            add_circle
          </Icon>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Budget Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the category you wanna add:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Budget Category Name"
            fullWidth
            onChange={handleTextInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveCategory} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

BudgetAddCategory.defaultProps = {
  open: false,
  handleAddCategory: null,
  handleSaveCategory: null,
  handleClose: null,
  handleTextInput: null
};

BudgetAddCategory.propTypes = {
  open: PropTypes.bool,
  handleAddCategory: PropTypes.func,
  handleSaveCategory: PropTypes.func,
  handleClose: PropTypes.func,
  handleTextInput: PropTypes.func
};

export default BudgetAddCategory;
