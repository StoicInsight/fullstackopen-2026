import React from 'react';

const Buttons = (props) => {
  return (
    <div>
      <button onClick={props.handleGood}>Good</button>
      <button onClick={props.handleNeutral}>Neutral</button>
      <button onClick={props.handleBad}>Bad</button>
    </div>
  );
};

export default Buttons;
