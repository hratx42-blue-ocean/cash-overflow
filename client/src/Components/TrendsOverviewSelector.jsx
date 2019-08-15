import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

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
const date = new Date();
const currentMonth = date.getMonth().toString();
const currentYear = date.getFullYear().toString();
export default function OverviewSelector(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    month: currentMonth,
    year: currentYear,
    years: []
  });

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  const updateYear = () => {
    let result = {};
    for (let i = 0; i < props.data.accountData.accounts.length; i++) {
      for (let obj in props.data.accountData.accounts[i].transactions) {
        result[obj] = 1;
      }
    }
    return Object.keys(result);
  };

  React.useEffect(() => {
    setState({
      ...state,
      years: updateYear()
    });
  }, []);

  React.useEffect(() => {
    props.setMonth(state.month);
    props.setYear(state.year);
  }, [state.month, state.year]);

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
          <option value=""></option>
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
          {state.years.map((year, i) => (
            <option value={year} key={i}>
              {year}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

OverviewSelector.propTypes = {
  data: PropTypes.object,
  setMonth: PropTypes.func,
  setYear: PropTypes.func
};
