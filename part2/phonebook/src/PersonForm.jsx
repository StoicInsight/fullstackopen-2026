import React from 'react';
import { useState } from 'react';

const PersonForm = (props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeNumber = (e) => {
    setNumber(e.target.value);
  };

  return (
    <form onSubmit={() => props.addPerson(event, name, number)}>
      <div>
        name: <input value={name} onChange={changeName} />
      </div>
      <div>
        number: <input value={number} onChange={changeNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
