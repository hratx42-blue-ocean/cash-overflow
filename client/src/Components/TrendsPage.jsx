import React, { Component } from 'react';
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

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
        <TrendsOverview />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TrendsHabits />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TrendsComparison />
      </TabPanel>
    </Paper>
  );
}
