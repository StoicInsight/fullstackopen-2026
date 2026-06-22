import React from 'react';
import StatisticLine from './StatisticLine';

const Statistics = (props) => {
  if (props.feedBack.all > 0) {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <StatisticLine text='Good' value={props.feedBack.good} />
          <StatisticLine text='Neutral' value={props.feedBack.neutral} />
          <StatisticLine text='Bad' value={props.feedBack.bad} />
          <StatisticLine text='All' value={props.feedBack.all} />
          <StatisticLine text='Average' value={props.feedBack.average} />
          <StatisticLine text='Positive' value={props.feedBack.positive} />
        </table>
      </>
    );
  } else {
    return (
      <>
        <p>No feedback given </p>
      </>
    );
  }
};

export default Statistics;
