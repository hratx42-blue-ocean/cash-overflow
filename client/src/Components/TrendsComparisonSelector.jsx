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
const year = date.getFullYear();
const month = date.getMonth();
const month2 = month === 0 ? 11 : month - 1;

export default function ComparisonSelector(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    month1: month.toString(),
    year1: year.toString(),
    month2: month2.toString(),
    year2: year.toString(),
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

  React.useEffect(() => props.setM1(state.month1), [state.month1]);
  React.useEffect(() => props.setM2(state.month2), [state.month2]);
  React.useEffect(() => props.setY1(state.year1), [state.year1]);
  React.useEffect(() => props.setY2(state.year2), [state.year2]);

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
            {state.years.map((year, i) => (
              <option key={i} value={year}>
                {year}
              </option>
            ))}
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
            {state.years.map((year, i) => (
              <option key={i} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

ComparisonSelector.propTypes = {
  data: PropTypes.object,
  setM1: PropTypes.func,
  setM2: PropTypes.func,
  setY1: PropTypes.func,
  setY2: PropTypes.func
};
