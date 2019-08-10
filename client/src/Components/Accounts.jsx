import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


export default class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Accounts</h1>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={6}>
            <Paper>xs=6</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
