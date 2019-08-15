import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TrendsOverview from './TrendsOverview.jsx';
import TrendsHabits from './TrendsHabits.jsx';
import TrendsComparison from './TrendsComparison.jsx';
import OverviewSelector from './TrendsOverviewSelector.jsx';
import HabitsSelector from './TrendsHabitsSelector.jsx';
import ComparisonSelector from './TrendsComparisonSelector.jsx';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`
  };
}

export default function TrendsPage(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [overviewYear, setOverviewYear] = React.useState('');
  const [overviewMonth, setOverviewMonth] = React.useState('');
  const [habitView, setHabitView] = React.useState('month');
  const [habitCategory, setHabitCategory] = React.useState('');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Overview" {...a11yProps(0)} />
        <Tab label="Habits" {...a11yProps(1)} />
        <Tab label="Comparison" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TrendsOverview
          data={props}
          year={overviewYear}
          month={overviewMonth}
        />
        <OverviewSelector
          data={props}
          setYear={setOverviewYear}
          setMonth={setOverviewMonth}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TrendsHabits data={props} view={habitView} category={habitCategory} />
        <HabitsSelector
          data={props}
          setView={setHabitView}
          setCategory={setHabitCategory}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TrendsComparison data={props} />
        <ComparisonSelector data={props} />
      </TabPanel>
    </Paper>
  );
}
