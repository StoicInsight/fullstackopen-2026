import React from 'react';
import phoneService from './services/phone.js';

const People = (props) => {
  return (
    <ul>
      {props.persons.map((people, i) => {
        return (
          <div className='' key={people.id}>
            <li key={i}>
              {people.name} {people.number}
            </li>
            <button onClick={() => props.deleteNumber(people)}>delete</button>
          </div>
        );
      })}
    </ul>
  );
};

export default People;
