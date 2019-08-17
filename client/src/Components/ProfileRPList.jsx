import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    width: 400,
    maxHeight: 200,
    overflow: 'auto',
    margin: 20,
    textAlign: 'center'
  },
  tablecell: {
    position: 'sticky',
    top: 0,
    background: 'white',
    align: 'center'
  }
}));

const ProfileRPList = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography>Monthly Payment Reminders:</Typography>
      <List>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablecell}>Payee</TableCell>
              <TableCell className={classes.tablecell}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.recurringTransactions.map((tx, i) => {
              return (
                <TableRow onClick={()=>console.log('woohoo')} key={`txRow_${i}`}>
                  <TableCell key={`txPayee_${i}`}>{tx.payee}</TableCell>
                  <TableCell key={`txAmount_${i}`}>${tx.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </List>
    </Paper>
  );
};

export default ProfileRPList;
