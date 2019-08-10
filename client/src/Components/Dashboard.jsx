import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createData } from '../../../db/dataSeeder.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountData: {},
      netBalance: 0,
      inputAmount: 0,
      inputCategory: '',
      inputPayee: ''
    };
  }

  componentDidMount() {
    this.setState({
      data: createData()
    });
  }

  render() {
    const classes = useStyles();

    return(
      <div className={class.root}>
        
      </div>
    )
  }
}
