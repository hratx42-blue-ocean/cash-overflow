import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
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
    month: 0,
    year: 2019
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
        <InputLabel>Month</InputLabel>
        <Select
          native
          value={state.month}
          onChange={handleChange1('month')}
          inputProps={{
            name: 'month'
          }}
        >
          <option value="" />
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
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
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          className={classes.group}
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender2"
          className={classes.group}
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="female"
            control={<Radio color="primary" />}
            label="Female"
            labelPlacement="start"
          />
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label="Male"
            labelPlacement="start"
          />
          <FormControlLabel
            value="other"
            control={<Radio color="primary" />}
            label="Other"
            labelPlacement="start"
          />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
            labelPlacement="start"
          />
        </RadioGroup>
        <FormHelperText>labelPlacement start</FormHelperText>
      </FormControl>
    </div>
  );
}
