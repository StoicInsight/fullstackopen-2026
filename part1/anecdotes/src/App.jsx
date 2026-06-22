import { useState } from 'react';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      count: 0,
      anecdote: 'If it hurts, do it more often.',
      vote: 0,
    },
    {
      count: 1,
      anecdote: 'Adding manpower to a late software project makes it later!',
      vote: 0,
    },
    {
      count: 2,
      anecdote:
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      vote: 0,
    },
    {
      count: 3,
      anecdote:
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      vote: 0,
    },
    {
      count: 4,
      anecdote: 'Premature optimization is the root of all evil.',
      vote: 0,
    },
    {
      count: 5,
      anecdote:
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      vote: 0,
    },
    {
      count: 6,
      anecdote:
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      vote: 0,
    },
    {
      count: 7,
      anecdote: 'The only way to go fast, is to go well.',
      vote: 0,
    },
  ]);

  const [selected, setSelected] = useState(0);

  const [mostVotes, setMostVotes] = useState(0);

  const handleNext = () => {
    console.log('Selected', selected);
    if (selected < anecdotes.length) {
      setSelected(selected + 1);
    }
    if (selected == anecdotes.length - 1) {
      setSelected(0);
    }
  };

  const handleVote = () => {
    const anecdote = [...anecdotes];
    anecdote[selected].vote += 1;
    setAnecdotes(anecdote);
    if (anecdote[selected].vote > anecdote[mostVotes].vote) {
      setMostVotes(selected);
    }
  };

  return (
    <div>
      <div className=''>
        <h1>{anecdotes[selected].anecdote}</h1>
        <h3>Has: {anecdotes[selected].vote} votes</h3>
      </div>
      <div className=''>
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleNext}>Next anecdote</button>
      </div>

      <div className=''>
        <h1>Anecdote with most votes</h1>
        <p>
          {anecdotes[mostVotes].vote > 0 && anecdotes[mostVotes].anecdote} ---{' '}
          {anecdotes[mostVotes].vote} votes
        </p>
      </div>
    </div>
  );
};

export default App;
