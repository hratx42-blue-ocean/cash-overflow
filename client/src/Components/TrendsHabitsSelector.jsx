import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

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
  },
  radioformControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  }
}));

export default function HabitsSelector() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    category: 0
  });
  const [value, setValue] = React.useState('time frame');

  const handleChange1 = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  const handleChange2 = event => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel>Category</InputLabel>
        <Select
          native
          value={state.category}
          onChange={handleChange1('category')}
          inputProps={{
            name: 'category'
          }}
        >
          <option value={0}>Example 1</option>
          <option value={1}>Example 2</option>
          <option value={2}>Example 3</option>
        </Select>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Time Period</FormLabel>
        <RadioGroup
          className={classes.group}
          value={value}
          onChange={handleChange2}
        >
          <FormControlLabel
            value="month"
            control={<Radio />}
            label="Month to Month"
          />
          <FormControlLabel
            value="year"
            control={<Radio />}
            label="Year to Year"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
