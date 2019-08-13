import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';

const AccountTransactions = props => {
  return (
    <>
      <Grid item xs={8}>
        <Paper style={{ maxHeight: 450, overflow: 'auto' }}>
          <List>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ position: 'sticky', top: 0, background: 'white' }}
                    align="center"
                  >
                    Date
                  </TableCell>
                  <TableCell
                    style={{ position: 'sticky', top: 0, background: 'white'  }}
                    align="center"
                  >
                    Payee
                  </TableCell>
                  <TableCell
                    style={{ position: 'sticky', top: 0, background: 'white'  }}
                    align="center"
                  >
                    Category
                  </TableCell>
                  <TableCell
                    style={{ position: 'sticky', top: 0, background: 'white'  }}
                    align="center"
                  >
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map((tx, i) => {
                  return (
                    <TableRow key={`txRow_${i}`}>
                      <TableCell key={`txDate_${i}`}>
                        {tx.date.toLocaleDateString('en-US')}
                      </TableCell>
                      <TableCell key={`tx_Payee${i}`}>{tx.payee}</TableCell>
                      <TableCell key={`tx_Category${i}`}>
                        {tx.category}
                      </TableCell>
                      <TableCell key={`txAmount_${i}`}>${tx.amount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </List>
        </Paper>
      </Grid>
    </>
  );
};

AccountTransactions.propTypes = {
  data: PropTypes.array
};

export default AccountTransactions;
