import { useState } from 'react';
import Statistics from './Statistics';
import Buttons from './Buttons';

function App() {
  const [feedBack, setFeedBack] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  });

  const handleGood = () => {
    setFeedBack({
      ...feedBack,
      good: feedBack.good + 1,
      all: feedBack.all + 1,
      average: (feedBack.good - feedBack.bad) / feedBack.all,
      positive: (feedBack.good / feedBack.all) * 100,
    });
  };
  const handleNeutral = () => {
    setFeedBack({
      ...feedBack,
      neutral: feedBack.neutral + 1,
      all: feedBack.all + 1,
      average: (feedBack.good - feedBack.bad) / feedBack.all,
      positive: (feedBack.good / feedBack.all) * 100,
    });
  };
  const handleBad = () => {
    setFeedBack({
      ...feedBack,
      bad: feedBack.bad + 1,
      all: feedBack.all + 1,
      average: (feedBack.good - feedBack.bad) / feedBack.all,
      positive: (feedBack.good / feedBack.all) * 100,
    });
  };

  return (
    <>
      <h1>Give feedback</h1>
      <Buttons
        handleGood={handleGood}
        handleBad={handleBad}
        handleNeutral={handleNeutral}
      />
      <Statistics
        handleGood={handleGood}
        handleBad={handleBad}
        handleNeutral={handleNeutral}
        feedBack={feedBack}
      />
    </>
  );
}

export default App;
