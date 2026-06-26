import React from 'react';
import { useState } from 'react';

const Filter = (props) => {
  const [filter, setFilter] = useState('');

  const newFilter = (e) => {
    setFilter(e.target.value);
    props.filterNames(filter);
  };

  return (
    <div className=''>
      Filter:
      <input value={filter} onChange={newFilter} />
    </div>
  );
};

export default Filter;
