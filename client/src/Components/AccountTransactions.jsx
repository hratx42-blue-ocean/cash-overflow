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
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const AccountTransactions = props => {
  let date = new Date(null, props.currentMonth, null);
  let currentMonthStr = date.toLocaleString('default', { month: 'long' });
  return (
    <>
      <Grid item xs={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={3}></Grid>
              <Grid item xs={6} align="center" style={{ paddingTop: 30 }}>
                <IconButton
                  onClick={props.handleLeftArrow}
                  aria-label="previous-month"
                >
                  <ChevronLeft />
                </IconButton>
                <Typography variant="button">{currentMonthStr}</Typography>
                <IconButton
                  onClick={props.handleRightArrow}
                  aria-label="next-month"
                >
                  <ChevronRight />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <FormControl
                  fullWidth={true}
                  style={{ paddingBottom: 20, marginTop: 20 }}
                >
                  <InputLabel htmlFor="account-filter">
                    Filter by Account
                  </InputLabel>
                  <Select
                    value={props.accountFilter}
                    onChange={props.handleAccountFilter}
                    input={<Input id="account-filter" />}
                  >
                    <MenuItem key={`accountFilter_blank`} value="">
                      All Accounts
                    </MenuItem>
                    {props.accountsList.map((acct, i) => {
                      return (
                        <MenuItem key={`accountFilter_${i}`} value={acct.name}>
                          {acct.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Paper style={{ maxHeight: 500, overflow: 'auto' }}>
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
                    style={{ position: 'sticky', top: 0, background: 'white' }}
                    align="center"
                  >
                    Payee
                  </TableCell>
                  <TableCell
                    style={{ position: 'sticky', top: 0, background: 'white' }}
                    align="center"
                  >
                    Category
                  </TableCell>
                  <TableCell
                    style={{ position: 'sticky', top: 0, background: 'white' }}
                    align="center"
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    style={{ position: 'sticky', top: 0, background: 'white' }}
                    align="center"
                  >
                    Account
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map((tx, i) => {
                  return (
                    <TableRow color="hoverColor" key={`txRow_${i}`}>
                      <TableCell key={`txDate_${i}`}>
                        {new Date(tx.date).toLocaleDateString('en-US')}
                      </TableCell>
                      <TableCell key={`txPayee_${i}`}>{tx.payee}</TableCell>
                      <TableCell key={`txCategory_${i}`}>
                        {tx.category}
                      </TableCell>
                      <TableCell key={`txAmount_${i}`}>${tx.amount}</TableCell>
                      <TableCell key={`txAccount_${i}`}>
                        {tx.accountName}
                      </TableCell>
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
  data: PropTypes.array,
  accountFilter: PropTypes.string,
  handleAccountFilter: PropTypes.func,
  accountsList: PropTypes.array
};

export default AccountTransactions;
