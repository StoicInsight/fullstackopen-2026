import React from 'react';

const People = (props) => {
  console.log('Filtered People Component', props.filteredPeople);
  console.log('People Component', props.persons);
  return (
    <ul>
      {props.filteredPeople.length > 0
        ? props.filteredPeople.map((people, i) => {
            return (
              <li key={i}>
                {people.name} {people.number}
              </li>
            );
          })
        : props.persons.map((people, i) => {
            return (
              <li key={i}>
                {people.name} {people.number}
              </li>
            );
          })}
    </ul>
  );
};

export default People;
