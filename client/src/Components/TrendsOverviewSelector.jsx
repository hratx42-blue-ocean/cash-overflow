import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    month: 0,
    year: 2019
  });

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel>Month</InputLabel>
        <Select
          native
          value={state.month}
          onChange={handleChange('month')}
          inputProps={{
            name: 'month'
          }}
        >
          <option value="" />
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Year</InputLabel>
        <Select
          native
          value={state.year}
          onChange={handleChange('year')}
          inputProps={{
            name: 'year'
          }}
        >
          <option value="" />
          <option value={2018}>2018</option>
          <option value={2019}>2019</option>
          <option value={2020}>2020</option>
        </Select>
      </FormControl>
    </div>
  );
}
