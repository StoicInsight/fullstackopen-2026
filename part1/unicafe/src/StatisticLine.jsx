import React from 'react';

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text} : {props.value} {props.text == 'Positive' && '%'}
      </td>
    </tr>
  );
};

export default StatisticLine;
