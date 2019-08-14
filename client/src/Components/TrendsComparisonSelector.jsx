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

export default function ComparisonSelector() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    month1: 0,
    year1: 2019,
    month2: 0,
    year2: 2019
  });

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  return (
    <div className={classes.root}>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel>Month 1</InputLabel>
          <Select
            native
            value={state.month}
            onChange={handleChange('month1')}
            inputProps={{
              name: 'month1'
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
          <InputLabel>Year 1</InputLabel>
          <Select
            native
            value={state.year}
            onChange={handleChange('year1')}
            inputProps={{
              name: 'year1'
            }}
          >
            <option value="" />
            <option value={2018}>2018</option>
            <option value={2019}>2019</option>
            <option value={2020}>2020</option>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel>Month 2</InputLabel>
          <Select
            native
            value={state.month}
            onChange={handleChange('month2')}
            inputProps={{
              name: 'month2'
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
          <InputLabel>Year 2</InputLabel>
          <Select
            native
            value={state.year}
            onChange={handleChange('year2')}
            inputProps={{
              name: 'year2'
            }}
          >
            <option value="" />
            <option value={2018}>2018</option>
            <option value={2019}>2019</option>
            <option value={2020}>2020</option>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
