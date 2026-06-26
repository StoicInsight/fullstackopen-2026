import React from 'react';

const Part = (props) => {
  return (
    <div>
      {props.course.parts.map((part, i) => (
        <li key={i}>
          {part.name} {part.exercises}
        </li>
      ))}
    </div>
  );
};

export default Part;
