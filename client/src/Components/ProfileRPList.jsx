import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    width: '100%',
    marginTop: 20,
    textAlign: 'center',
    height: '100%',
    maxHeight: 300,
    overflowY: 'auto',
    alignContent: 'center'
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
    <Paper className={classes.paper} style={{ maxHeight: 480, overflow: 'auto' }}>
      <Typography style={{margin: 0, padding: 15}}>Monthly Payment Reminders:</Typography>
      <List style={{maxHeight: 380, overflow: 'auto', paddingTop: 0}}>
        <Table >
          <TableHead >
            <TableRow >
              <TableCell style={{ margin: 0, position: 'sticky', top: 0, background: 'white' }}>Payee</TableCell>
              <TableCell style={{ margin: 0, position: 'sticky', top: 0, background: 'white' }}>Amount</TableCell>
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
