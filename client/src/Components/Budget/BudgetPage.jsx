import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Today from '@material-ui/icons/Today';
import Loading from '../Loading';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  jumbotron: {
    marginTop: '50px',
    textAlign: 'center'
  },
  table: {
    minWidth: 650
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

const BudgetPage = props => {
  const classes = useStyles();
  const { targetDate, handleMonthChange } = props;
  const { loading, isAuthenticated } = props;
  if (loading || !isAuthenticated) {
    return (
      <div data-testid="auth-loading">
        <Loading />
      </div>
    );
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      spacing={5}
    >
      <Grid item xs={12} className={classes.jumbotron}>
        <Typography variant="h2" gutterBottom>
          {`Your budget for ${targetDate.format('MMMM, YYYY')}`}
        </Typography>
        <IconButton
          onClick={() => handleMonthChange(1)}
          aria-label="previous-month"
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={() => handleMonthChange()}
          aria-label="previous-month"
        >
          <Today />
        </IconButton>
        <IconButton
          onClick={() => handleMonthChange(-1)}
          aria-label="next-month"
        >
          <ChevronRight />
        </IconButton>
      </Grid>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Budget Category</TableCell>
              <TableCell align="right">Allotted</TableCell>
              <TableCell align="right">Spent</TableCell>
              <TableCell align="right">Remaining</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};

BudgetPage.propTypes = {};

export default BudgetPage;
