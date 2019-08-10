import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleAddAccount = this.handleAddAccount.bind(this);
  }

  handleAddAccount() {}

  render() {
    return (
      <div>
        <h1>Accounts</h1>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Account</TableCell>
                    <TableCell align="center">Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Account Name</TableCell>
                    <TableCell>$ Balance.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
            <Chip
              avatar={
                <Avatar>
                  <AddIcon />
                </Avatar>
              }
              label="Add an account"
              color="primary"
              onClick={this.handleAddAccount}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Transactions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Transaction 1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
