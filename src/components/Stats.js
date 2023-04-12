import React from 'react';

const Stats = ({ stats }) => {
  return (
      <div style={{ margin: "0px 4px" }}>
      <p>Percentage of runs that exceed the maximum number of stops: {stats.exceedMaxStopsPercentage}%</p>
      <p>Percentage of runs that exceed the maximum running time: {stats.exceedMaxRunningTimePercentage}%</p>
      <p>Percentage of runs that have a collision: {stats.collisionPercentage}%</p>
      <p>Percentage of runs that do not pass: {stats.failPercentage}%</p>
    </div>
  );
};

export default Stats;
